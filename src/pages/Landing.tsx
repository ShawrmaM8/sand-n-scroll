import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import {
  Brain,
  Zap,
  Users,
  Trophy,
  Globe,
  Sparkles,
  Target,
  ChevronRight,
  Star,
  BookOpen,
  MessageSquare,
  Award,
} from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20 geometric-pattern">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-background pointer-events-none" />
        
        <div className="relative max-w-6xl mx-auto text-center space-y-8 animate-fade-in">
          {/* Logo/Brand */}
          <div className="space-y-2">
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Gulfara
            </h1>
            <p className="text-3xl md:text-4xl font-semibold text-muted-foreground" dir="rtl">
              غلفارا
            </p>
          </div>

          {/* Tagline */}
          <p className="text-xl md:text-2xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
            Master Gulf Arabic through intelligent spaced repetition, gamified learning, and a vibrant community
          </p>

          {/* Key Value Props */}
          <div className="flex flex-wrap justify-center gap-3 pt-4">
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              <Brain className="w-4 h-4 mr-2" />
              Adaptive SRS Algorithm
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              <Zap className="w-4 h-4 mr-2" />
              Offline-First
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              <Users className="w-4 h-4 mr-2" />
              Community Trading
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              <Trophy className="w-4 h-4 mr-2" />
              Gamified Rewards
            </Badge>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Button
              size="lg"
              className="luxury-button text-lg px-8 py-6"
              onClick={() => navigate("/srs")}
            >
              Start Learning
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 border-2"
              onClick={() => navigate("/about")}
            >
              Learn More
            </Button>
          </div>

          {/* Social Proof */}
          <div className="flex items-center justify-center gap-8 pt-12 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 fill-accent text-accent" />
              <span className="font-semibold text-foreground">Premium Learning</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-border" />
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-accent" />
              <span className="font-semibold text-foreground">Gulf-Focused</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 bg-card/30">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Why Choose Gulfara?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience a revolutionary approach to learning Gulf Arabic dialect
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {/* Feature Cards */}
            <Card className="flashcard group">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent to-accent/70 flex items-center justify-center shadow-[var(--luxury-shadow)]">
                  <Brain className="w-7 h-7 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  Intelligent SRS
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Adaptive spaced repetition algorithm optimizes your learning path, showing cards exactly when you need to review them for maximum retention.
                </p>
              </div>
            </Card>

            <Card className="flashcard group">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-[var(--card-shadow)]">
                  <Zap className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  Offline-First Design
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Study anywhere, anytime. All your progress syncs automatically when you're back online—no internet required for learning.
                </p>
              </div>
            </Card>

            <Card className="flashcard group">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent to-accent/70 flex items-center justify-center shadow-[var(--luxury-shadow)]">
                  <Trophy className="w-7 h-7 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  Gamified Rewards
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Earn coins, unlock badges, and maintain streaks. Redeem rewards for premium avatars, hints, and exclusive deck slots.
                </p>
              </div>
            </Card>

            <Card className="flashcard group">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-[var(--card-shadow)]">
                  <Users className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  Community Trading
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Share and discover custom decks in the vibrant forum. Trade learning materials and connect with fellow Gulf Arabic enthusiasts.
                </p>
              </div>
            </Card>

            <Card className="flashcard group">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent to-accent/70 flex items-center justify-center shadow-[var(--luxury-shadow)]">
                  <BookOpen className="w-7 h-7 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  Curated Content
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Access professionally crafted flashcard decks focused on Gulf dialects. Import, create, and customize your learning experience.
                </p>
              </div>
            </Card>

            <Card className="flashcard group">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-[var(--card-shadow)]">
                  <Sparkles className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  Luxurious Experience
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Immerse yourself in a beautifully crafted interface with Gulf-inspired aesthetics, smooth animations, and cultural motifs.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-4 geometric-pattern">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Your Learning Journey
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Four simple steps to mastering Gulf Arabic
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
            {[
              {
                step: "01",
                icon: Target,
                title: "Choose Your Deck",
                description: "Browse curated decks or create your own custom flashcard collection",
              },
              {
                step: "02",
                icon: Brain,
                title: "Study Smart",
                description: "Review cards with our adaptive SRS algorithm that optimizes retention",
              },
              {
                step: "03",
                icon: Award,
                title: "Earn Rewards",
                description: "Collect coins, build streaks, and unlock exclusive badges and avatars",
              },
              {
                step: "04",
                icon: MessageSquare,
                title: "Join Community",
                description: "Share decks, trade materials, and learn together in the forum",
              },
            ].map((item, index) => (
              <div key={index} className="relative">
                <Card className="flashcard text-center h-full">
                  <div className="space-y-4">
                    <div className="text-6xl font-bold text-accent/20">
                      {item.step}
                    </div>
                    <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-accent to-accent/70 flex items-center justify-center shadow-[var(--luxury-shadow)]">
                      <item.icon className="w-6 h-6 text-accent-foreground" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4 bg-gradient-to-br from-primary to-primary/90 text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold">
            Ready to Master Gulf Arabic?
          </h2>
          <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto leading-relaxed">
            Join Gulfara today and experience the most engaging way to learn Gulf dialects through intelligent flashcards and community-driven content.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              size="lg"
              variant="secondary"
              className="text-lg px-8 py-6 bg-card text-card-foreground hover:bg-card/90"
              onClick={() => navigate("/")}
            >
              Get Started Free
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              onClick={() => navigate("/forum")}
            >
              Explore Community
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-card/50 border-t">
        <div className="max-w-6xl mx-auto text-center space-y-4">
          <div className="flex justify-center items-center gap-2">
            <h3 className="text-2xl font-bold text-foreground">Gulfara</h3>
            <span className="text-xl text-muted-foreground" dir="rtl">غلفارا</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Elevating Gulf Arabic learning through intelligent spaced repetition
          </p>
          <div className="flex justify-center gap-6 text-sm text-muted-foreground">
            <button onClick={() => navigate("/about")} className="hover:text-foreground transition-colors">
              About
            </button>
            <button onClick={() => navigate("/forum")} className="hover:text-foreground transition-colors">
              Forum
            </button>
            <button onClick={() => navigate("/rewards")} className="hover:text-foreground transition-colors">
              Rewards
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
