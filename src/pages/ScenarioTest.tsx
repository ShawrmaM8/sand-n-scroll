import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { Trophy, RefreshCw } from "lucide-react";

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

export default function ScenarioTest() {
  const { scenarioId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t, language } = useLanguage();
  const [scenario, setScenario] = useState<any>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadScenario();
  }, [scenarioId]);

  const loadScenario = async () => {
    try {
      const { data, error } = await supabase
        .from('scenarios')
        .select('*')
        .eq('id', scenarioId)
        .single();

      if (error) throw error;
      setScenario(data);
      setQuestions(Array.isArray(data.questions) ? data.questions as unknown as Question[] : []);
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

  const handleAnswer = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === questions[currentQuestion].correctAnswer;
    if (isCorrect) {
      setCorrectAnswers(correctAnswers + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      submitResults(isCorrect);
    }
  };

  const submitResults = async (lastCorrect: boolean) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const finalCorrect = correctAnswers + (lastCorrect ? 1 : 0);

      const { data: scoreData, error: scoreError } = await supabase.functions.invoke('calculate-score', {
        body: {
          scenarioId,
          difficulty: scenario.difficulty,
          correctAnswers: finalCorrect,
          totalQuestions: questions.length,
          userId: user.id
        }
      });

      if (scoreError) throw scoreError;

      setShowResults(true);
      toast({
        title: t("testCompleted"),
        description: `${t("earned")} ${scoreData.points} ${t("points")}!`
      });
    } catch (error: any) {
      toast({
        title: t("error"),
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">{t("loading")}</div>;
  }

  if (showResults) {
    return (
      <div className="container mx-auto py-8 px-4" dir={language === "ar" ? "rtl" : "ltr"}>
        <Card className="max-w-2xl mx-auto text-center">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2 text-2xl">
              <Trophy className="w-8 h-8 text-yellow-500" />
              {t("testCompleted")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-4xl font-bold">
              {correctAnswers} / {questions.length}
            </div>
            <p className="text-lg text-muted-foreground">
              {t("correctAnswers")}
            </p>
            <div className="flex gap-4 justify-center">
              <Button onClick={() => navigate("/")}>
                {t("goHome")}
              </Button>
              <Button variant="outline" onClick={() => window.location.reload()}>
                <RefreshCw className="w-4 h-4 mr-2" />
                {t("retake")}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const current = questions[currentQuestion];

  return (
    <div className="container mx-auto py-8 px-4" dir={language === "ar" ? "rtl" : "ltr"}>
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">{scenario.title}</h1>
          <p className="text-muted-foreground">{scenario.description}</p>
        </div>

        <Progress value={progress} className="h-2" />

        <Card>
          <CardHeader>
            <CardTitle>
              {t("question")} {currentQuestion + 1} / {questions.length}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-lg font-semibold">{current.question}</p>

            <RadioGroup
              value={selectedAnswer?.toString()}
              onValueChange={(value) => setSelectedAnswer(parseInt(value))}
            >
              {current.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 rtl:space-x-reverse p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <Button
              onClick={handleAnswer}
              disabled={selectedAnswer === null}
              className="w-full"
              size="lg"
            >
              {currentQuestion === questions.length - 1 ? t("finish") : t("next")}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}