import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { Target, Zap, Award } from "lucide-react";

export default function ScenarioMode() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t, language } = useLanguage();
  const [flashcards, setFlashcards] = useState<any[]>([]);
  const [generating, setGenerating] = useState(false);
  const [scenarios, setScenarios] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [sessionId]);

  const loadData = async () => {
    try {
      const { data: session, error: sessionError } = await supabase
        .from('flashcard_sessions')
        .select('flashcards')
        .eq('id', sessionId)
        .single();

      if (sessionError) throw sessionError;
      setFlashcards(Array.isArray(session.flashcards) ? session.flashcards : []);

      const { data: scenariosData, error: scenariosError } = await supabase
        .from('scenarios')
        .select('*')
        .eq('session_id', sessionId);

      if (scenariosError) throw scenariosError;
      setScenarios(scenariosData || []);
    } catch (error: any) {
      toast({
        title: t("error"),
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const generateScenario = async (difficulty: string) => {
    setGenerating(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data: scenarioData, error: scenarioError } = await supabase.functions.invoke('generate-scenario', {
        body: { flashcards, difficulty }
      });

      if (scenarioError) throw scenarioError;

      const { data: newScenario, error: insertError } = await supabase
        .from('scenarios')
        .insert({
          session_id: sessionId,
          user_id: user.id,
          title: scenarioData.title,
          description: scenarioData.description,
          difficulty,
          questions: scenarioData.questions
        })
        .select()
        .single();

      if (insertError) throw insertError;

      toast({ title: t("scenarioGenerated") });
      navigate(`/scenario-test/${newScenario.id}`);
    } catch (error: any) {
      toast({
        title: t("error"),
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setGenerating(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">{t("loading")}</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4" dir={language === "ar" ? "rtl" : "ltr"}>
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">{t("scenarioMode")}</h1>
          <p className="text-muted-foreground">{t("scenarioModeDesc")}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => generateScenario('easy')}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-green-500" />
                {t("easy")}
              </CardTitle>
              <CardDescription>{t("easyDesc")}</CardDescription>
            </CardHeader>
            <CardContent>
              <Badge variant="secondary">10 {t("points")}</Badge>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => generateScenario('medium')}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                {t("medium")}
              </CardTitle>
              <CardDescription>{t("mediumDesc")}</CardDescription>
            </CardHeader>
            <CardContent>
              <Badge variant="secondary">20 {t("points")}</Badge>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => generateScenario('hard')}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-red-500" />
                {t("hard")}
              </CardTitle>
              <CardDescription>{t("hardDesc")}</CardDescription>
            </CardHeader>
            <CardContent>
              <Badge variant="secondary">30 {t("points")}</Badge>
            </CardContent>
          </Card>
        </div>

        {scenarios.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">{t("previousScenarios")}</h2>
            <div className="grid gap-4">
              {scenarios.map((scenario) => (
                <Card key={scenario.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>{scenario.title}</CardTitle>
                      <Badge>{scenario.difficulty}</Badge>
                    </div>
                    <CardDescription>{scenario.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button onClick={() => navigate(`/scenario-test/${scenario.id}`)}>
                      {t("takeTest")}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}