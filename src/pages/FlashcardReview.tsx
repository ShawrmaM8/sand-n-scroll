import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { useUserProgress } from "@/hooks/useUserProgress";
import { ChevronLeft, ChevronRight, RotateCcw, ThumbsUp, ThumbsDown, Smile } from "lucide-react";

interface Flashcard {
  front: string;
  back: string;
  difficulty: string;
}

export default function FlashcardReview() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t, language } = useLanguage();
  const { addCoins, deductCoins, refresh } = useUserProgress();
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSession();
  }, [sessionId]);

  const loadSession = async () => {
    try {
      const { data, error } = await supabase
        .from('flashcard_sessions')
        .select('flashcards')
        .eq('id', sessionId)
        .maybeSingle();

      if (!data) {
        toast({
          title: t("error"),
          description: "Session not found",
          variant: "destructive",
        });
        navigate("/text-input");
        return;
      }

      if (error) throw error;
      setFlashcards(Array.isArray(data.flashcards) ? data.flashcards as unknown as Flashcard[] : []);
    } catch (error: any) {
      toast({
        title: t("error"),
        description: error.message,
        variant: "destructive",
      });
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const handleDifficultyRating = async (rating: 'easy' | 'good' | 'difficult') => {
    let coinChange = 0;
    let message = '';
    
    switch (rating) {
      case 'easy':
        coinChange = 5;
        message = language === 'ar' ? '+5 عملات!' : '+5 coins!';
        break;
      case 'good':
        coinChange = 1;
        message = language === 'ar' ? '+1 عملة!' : '+1 coin!';
        break;
      case 'difficult':
        coinChange = -10;
        message = language === 'ar' ? '-10 عملات' : '-10 coins';
        break;
    }

    // Update coins in database
    if (coinChange > 0) {
      const success = await addCoins(coinChange);
      if (success) {
        toast({
          title: rating === 'easy' ? '🎉 ' + (language === 'ar' ? 'ممتاز!' : 'Excellent!') : 
                 rating === 'good' ? '👍 ' + (language === 'ar' ? 'جيد!' : 'Good!') : '',
          description: message,
        });
      }
    } else if (coinChange < 0) {
      const success = await deductCoins(Math.abs(coinChange));
      if (success) {
        toast({
          title: language === 'ar' ? 'صعب' : 'Difficult',
          description: message,
          variant: "destructive",
        });
      } else {
        toast({
          title: language === 'ar' ? 'رصيد غير كافٍ' : 'Insufficient coins',
          description: language === 'ar' ? 'لا يوجد عملات كافية للخصم' : 'Not enough coins to deduct',
          variant: "destructive",
        });
      }
    }

    await refresh();

    // Move to next card
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false);
    } else {
      toast({
        title: language === 'ar' ? 'انتهت المراجعة!' : 'Review Complete!',
        description: language === 'ar' ? 'أحسنت! لقد راجعت جميع البطاقات.' : 'Great job! You reviewed all cards.',
      });
    }
  };

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowAnswer(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">{t("loading")}</div>;
  }

  const progress = ((currentIndex + 1) / flashcards.length) * 100;
  const currentCard = flashcards[currentIndex];

  return (
    <div className="container mx-auto py-8 px-4" dir={language === "ar" ? "rtl" : "ltr"}>
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">{t("reviewFlashcards")}</h1>
          <Button variant="outline" onClick={() => navigate("/scenario-mode")}>
            {t("goToScenarios")}
          </Button>
        </div>

        <Progress value={progress} className="h-2" />

        <Card className="min-h-[400px] flex flex-col">
          <CardHeader>
            <CardTitle className="text-center">
              {t("card")} {currentIndex + 1} / {flashcards.length}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col items-center justify-center text-center space-y-8">
            <div className="text-2xl font-semibold">
              {showAnswer ? currentCard.back : currentCard.front}
            </div>

            <Button
              onClick={() => setShowAnswer(!showAnswer)}
              variant="outline"
              className="gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              {showAnswer ? t("showQuestion") : t("showAnswer")}
            </Button>

            {/* Difficulty Rating Buttons - Only show when answer is visible */}
            {showAnswer && (
              <div className="flex gap-3">
                <Button
                  onClick={() => handleDifficultyRating('difficult')}
                  variant="outline"
                  className="gap-2 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                >
                  <ThumbsDown className="w-4 h-4" />
                  {language === 'ar' ? 'صعب (-10)' : 'Difficult (-10)'}
                </Button>
                <Button
                  onClick={() => handleDifficultyRating('good')}
                  variant="outline"
                  className="gap-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <Smile className="w-4 h-4" />
                  {language === 'ar' ? 'جيد (+1)' : 'Good (+1)'}
                </Button>
                <Button
                  onClick={() => handleDifficultyRating('easy')}
                  variant="outline"
                  className="gap-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                >
                  <ThumbsUp className="w-4 h-4" />
                  {language === 'ar' ? 'سهل (+5)' : 'Easy (+5)'}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex gap-4 justify-center">
          <Button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            variant="outline"
            className="gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            {t("previous")}
          </Button>
          <Button
            onClick={handleNext}
            disabled={currentIndex === flashcards.length - 1}
            className="gap-2"
          >
            {t("next")}
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}