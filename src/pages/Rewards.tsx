import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Coins, Star, Shield, Lightbulb, Plus } from "lucide-react";

export default function Rewards() {
  const rewards = [
    { id: 1, name: "Golden Avatar", cost: 500, type: "avatar", icon: Star },
    { id: 2, name: "Study Streak Shield", cost: 300, type: "badge", icon: Shield },
    { id: 3, name: "Hint Pack (5x)", cost: 150, type: "hint", icon: Lightbulb },
    { id: 4, name: "Extra Deck Slot", cost: 750, type: "slot", icon: Plus },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Rewards Shop</h1>
        <div className="coin-counter text-lg">
          <Coins className="w-5 h-5 mr-2" />
          1,247 coins available
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {rewards.map((reward) => (
          <Card key={reward.id} className="flashcard">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center mx-auto mb-2">
                <reward.icon className="w-6 h-6 text-accent" />
              </div>
              <CardTitle className="text-lg">{reward.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-center">
              <div className="coin-counter">
                <Coins className="w-4 h-4 mr-1" />
                {reward.cost}
              </div>
              <Button className="w-full" variant="outline">
                Purchase
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}