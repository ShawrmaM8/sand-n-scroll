import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface PurchaseRequest {
  userId: string;
  rewardId: string;
  rewardName: string;
  rewardType: string;
  cost: number;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userId, rewardId, rewardName, rewardType, cost } = await req.json() as PurchaseRequest;

    console.log(`Processing purchase: User ${userId}, Reward ${rewardId}, Cost ${cost}`);

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get current user progress
    const { data: progress, error: progressError } = await supabase
      .from('user_progress')
      .select('coins')
      .eq('user_id', userId)
      .single();

    if (progressError) {
      console.error('Error fetching progress:', progressError);
      throw new Error('Failed to fetch user progress');
    }

    const currentCoins = progress?.coins ?? 0;

    // Check if user has enough coins
    if (currentCoins < cost) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Insufficient coins',
          currentCoins,
          required: cost
        }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Deduct coins
    const newCoins = currentCoins - cost;
    const { error: updateError } = await supabase
      .from('user_progress')
      .update({ coins: newCoins })
      .eq('user_id', userId);

    if (updateError) {
      console.error('Error updating coins:', updateError);
      throw new Error('Failed to update coins');
    }

    // Log the transaction
    const { error: transactionError } = await supabase
      .from('coin_transactions')
      .insert({
        user_id: userId,
        amount: -cost,
        action_type: 'reward_purchase',
        reference_id: rewardId
      });

    if (transactionError) {
      console.error('Error logging transaction:', transactionError);
      // Don't fail the purchase if transaction logging fails
    }

    // Check if reward exists in rewards table, if so record in user_rewards
    const { data: rewardData } = await supabase
      .from('rewards')
      .select('id')
      .eq('id', rewardId)
      .maybeSingle();

    if (rewardData) {
      const { error: userRewardError } = await supabase
        .from('user_rewards')
        .insert({
          user_id: userId,
          reward_id: rewardData.id
        });

      if (userRewardError) {
        console.error('Error recording user reward:', userRewardError);
      }
    }

    console.log(`Purchase successful: New balance ${newCoins}`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        newCoins,
        message: `Successfully purchased ${rewardName}`
      }),
      { 
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('Purchase error:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});