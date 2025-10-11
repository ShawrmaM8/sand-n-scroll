import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
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
  Languages,
  X,
} from "lucide-react";
import dallahLogo from "@/assets/dallah-logo.png";

const translations = {
  en: {
    hero: {
      tagline: "Master Gulf Arabic through intelligent spaced repetition, gamified learning, and a vibrant community",
      startLearning: "Start Learning",
      learnMore: "Learn More",
      premiumLearning: "Premium Learning",
      gulfFocused: "Gulf-Focused",
    },
    features: {
      title: "Why Choose Gulfara?",
      subtitle: "Experience a revolutionary approach to learning Gulf Arabic dialect",
      intelligentSRS: {
        title: "Intelligent SRS",
        desc: "Adaptive spaced repetition algorithm optimizes your learning path, showing cards exactly when you need to review them for maximum retention.",
      },
      offlineFirst: {
        title: "Offline-First Design",
        desc: "Study anywhere, anytime. All your progress syncs automatically when you're back online—no internet required for learning.",
      },
      gamifiedRewards: {
        title: "Gamified Rewards",
        desc: "Earn coins, unlock badges, and maintain streaks. Redeem rewards for premium avatars, hints, and exclusive deck slots.",
      },
      communityTrading: {
        title: "Community Trading",
        desc: "Share and discover custom decks in the vibrant forum. Trade learning materials and connect with fellow Gulf Arabic enthusiasts.",
      },
      curatedContent: {
        title: "Curated Content",
        desc: "Access professionally crafted flashcard decks focused on Gulf dialects. Import, create, and customize your learning experience.",
      },
      luxuriousExperience: {
        title: "Luxurious Experience",
        desc: "Immerse yourself in a beautifully crafted interface with Gulf-inspired aesthetics, smooth animations, and cultural motifs.",
      },
    },
    journey: {
      title: "Your Learning Journey",
      subtitle: "Four simple steps to mastering Gulf Arabic",
      step1: { title: "Choose Your Deck", desc: "Browse curated decks or create your own custom flashcard collection" },
      step2: { title: "Study Smart", desc: "Review cards with our adaptive SRS algorithm that optimizes retention" },
      step3: { title: "Earn Rewards", desc: "Collect coins, build streaks, and unlock exclusive badges and avatars" },
      step4: { title: "Join Community", desc: "Share decks, trade materials, and learn together in the forum" },
    },
    cta: {
      title: "Ready to Master Gulf Arabic?",
      subtitle: "Join Gulfara today and experience the most engaging way to learn Gulf dialects through intelligent flashcards and community-driven content.",
      getStarted: "Get Started Free",
      exploreCommunity: "Explore Community",
    },
    footer: {
      subtitle: "Elevating Gulf Arabic learning through intelligent spaced repetition",
      about: "About",
      forum: "Forum",
      rewards: "Rewards",
    },
    support: {
      title: "Support Our Development",
      emailPlaceholder: "Enter your email",
      fundLaunch: "Fund Our Launch",
      monthlyLabel: "(monthly costs)",
      hosting: "Hosting, $21.32",
      database: "Database, $25.12",
      developerTools: "Developer Tools, $20.00",
      userAcquisition: "User Acquisition, $180",
      evaluateTitle: "Evaluate & Collaborate On Our Prototype",
      visit: "VISIT",
      acquisitionModalTitle: "User Acquisition Campaign Details",
      acquisitionModalDesc: "Investment breakdown for reaching 36,000-120,000 impressions/month",
      targeting: "Targeting Type",
      cpm: "CPM (USD)",
      impressions: "Estimated Impressions",
      broad: "Broad (low targeting)",
      interestBased: "Interest-based",
      nicheSubreddit: "Niche subreddit",
      summaryTitle: "Summary:",
      summaryRange: "Realistic range: 36,000–120,000 impressions/month for $180.",
      summaryStrategy: "Optimal strategy for reach: run broad or interest-based campaigns with minimal targeting constraints and static image ads.",
      close: "Close",
    },
    badges: {
      adaptiveSRS: "Adaptive SRS Algorithm",
      offlineFirst: "Offline-First",
      communityTrading: "Community Trading",
      gamifiedRewards: "Gamified Rewards",
    },
  },
  ar: {
    hero: {
      tagline: "إتقان اللهجة الخليجية من خلال التكرار المتباعد الذكي، والتعلم التفاعلي، والمجتمع النابض بالحياة",
      startLearning: "ابدأ التعلم",
      learnMore: "اعرف المزيد",
      premiumLearning: "تعلم متميز",
      gulfFocused: "تركيز خليجي",
    },
    features: {
      title: "لماذا تختار غلفارا؟",
      subtitle: "اختبر نهجاً ثورياً لتعلم اللهجة العربية الخليجية",
      intelligentSRS: {
        title: "نظام SRS ذكي",
        desc: "خوارزمية التكرار المتباعد التكيفية تحسّن مسار تعلمك، وتعرض البطاقات تماماً عندما تحتاج لمراجعتها لأقصى احتفاظ.",
      },
      offlineFirst: {
        title: "تصميم يعمل دون اتصال",
        desc: "ادرس في أي مكان وزمان. يتم مزامنة تقدمك تلقائياً عند العودة للإنترنت—لا حاجة للإنترنت للتعلم.",
      },
      gamifiedRewards: {
        title: "مكافآت تفاعلية",
        desc: "اكسب العملات، وافتح الشارات، وحافظ على سلاسلك. استبدل المكافآت بصور رمزية متميزة وتلميحات وفتحات إضافية.",
      },
      communityTrading: {
        title: "تبادل مجتمعي",
        desc: "شارك واكتشف مجموعات مخصصة في المنتدى النابض. تبادل مواد التعلم وتواصل مع عشاق اللهجة الخليجية.",
      },
      curatedContent: {
        title: "محتوى منتقى",
        desc: "الوصول إلى مجموعات بطاقات تعليمية احترافية تركز على اللهجات الخليجية. استورد وأنشئ وخصص تجربة التعلم الخاصة بك.",
      },
      luxuriousExperience: {
        title: "تجربة فاخرة",
        desc: "انغمس في واجهة مصممة بشكل جميل مع جماليات مستوحاة من الخليج، ورسوم متحركة سلسة، ونقوش ثقافية.",
      },
    },
    journey: {
      title: "رحلة التعلم الخاصة بك",
      subtitle: "أربع خطوات بسيطة لإتقان اللهجة الخليجية",
      step1: { title: "اختر مجموعتك", desc: "تصفح المجموعات المنتقاة أو أنشئ مجموعة بطاقات تعليمية مخصصة" },
      step2: { title: "ادرس بذكاء", desc: "راجع البطاقات باستخدام خوارزمية SRS التكيفية التي تحسّن الاحتفاظ" },
      step3: { title: "اكسب المكافآت", desc: "اجمع العملات، وابنِ سلاسل، وافتح شارات وصور رمزية حصرية" },
      step4: { title: "انضم للمجتمع", desc: "شارك المجموعات، وتبادل المواد، وتعلم مع الآخرين في المنتدى" },
    },
    cta: {
      title: "هل أنت مستعد لإتقان اللهجة الخليجية؟",
      subtitle: "انضم إلى غلفارا اليوم واختبر الطريقة الأكثر جاذبية لتعلم اللهجات الخليجية من خلال البطاقات التعليمية الذكية والمحتوى المدفوع بالمجتمع.",
      getStarted: "ابدأ مجاناً",
      exploreCommunity: "استكشف المجتمع",
    },
    footer: {
      subtitle: "الارتقاء بتعلم اللهجة الخليجية من خلال التكرار المتباعد الذكي",
      about: "حول",
      forum: "المنتدى",
      rewards: "المكافآت",
    },
    support: {
      title: "ادعم تطويرنا",
      emailPlaceholder: "أدخل بريدك الإلكتروني",
      fundLaunch: "مول إطلاقنا",
      monthlyLabel: "(التكاليف الشهرية)",
      hosting: "الاستضافة، ٢١.٣٢ دولار",
      database: "قاعدة البيانات، ٢٥.١٢ دولار",
      developerTools: "أدوات المطورين، ٢٠.٠٠ دولار",
      userAcquisition: "اكتساب المستخدمين، ١٨٠ دولار",
      evaluateTitle: "قيّم وتعاون على نموذجنا الأولي",
      visit: "زيارة",
      acquisitionModalTitle: "تفاصيل حملة اكتساب المستخدمين",
      acquisitionModalDesc: "توزيع الاستثمار للوصول إلى 36,000-120,000 ظهور/شهر",
      targeting: "نوع الاستهداف",
      cpm: "تكلفة الألف ظهور (دولار)",
      impressions: "الظهورات المقدرة",
      broad: "واسع (استهداف منخفض)",
      interestBased: "قائم على الاهتمامات",
      nicheSubreddit: "منتدى فرعي متخصص",
      summaryTitle: "الملخص:",
      summaryRange: "النطاق الواقعي: 36,000-120,000 ظهور/شهر مقابل 180 دولار.",
      summaryStrategy: "الاستراتيجية المثلى للوصول: تشغيل حملات واسعة أو قائمة على الاهتمامات مع الحد الأدنى من قيود الاستهداف وإعلانات الصور الثابتة.",
      close: "إغلاق",
    },
    badges: {
      adaptiveSRS: "خوارزمية SRS تكيفية",
      offlineFirst: "يعمل دون اتصال",
      communityTrading: "تبادل مجتمعي",
      gamifiedRewards: "مكافآت تفاعلية",
    },
  },
};

const Landing = () => {
  const navigate = useNavigate();
  const { language, toggleLanguage } = useLanguage();
  const [email, setEmail] = useState("");
  const [showAcquisitionModal, setShowAcquisitionModal] = useState(false);
  const t = translations[language];
  const isRTL = language === "ar";

  return (
    <div className="min-h-screen bg-background overflow-x-hidden" dir={isRTL ? "rtl" : "ltr"}>
      {/* Language Toggle Button */}
      <div className="fixed top-4 right-4 z-50">
        <Button
          onClick={toggleLanguage}
          variant="outline"
          size="icon"
          className="luxury-button shadow-lg"
        >
          <Languages className="w-5 h-5" />
        </Button>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20 geometric-pattern">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-background pointer-events-none" />
        
        <div className="relative max-w-6xl mx-auto text-center space-y-8 animate-fade-in">
          {/* Logo/Brand */}
          <div className="space-y-4">
            <img src={dallahLogo} alt="Gulfara Dallah Logo" className="w-24 h-24 mx-auto animate-fade-in" />
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Gulfara
            </h1>
            <p className="text-3xl md:text-4xl font-semibold text-muted-foreground" dir="rtl">
              غلفارا
            </p>
          </div>

          {/* Tagline */}
          <p className="text-xl md:text-2xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
            {t.hero.tagline}
          </p>

          {/* Key Value Props */}
          <div className="flex flex-wrap justify-center gap-3 pt-4">
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              <Brain className={`w-4 h-4 ${isRTL ? "ml-2" : "mr-2"}`} />
              {t.badges.adaptiveSRS}
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              <Zap className={`w-4 h-4 ${isRTL ? "ml-2" : "mr-2"}`} />
              {t.badges.offlineFirst}
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              <Users className={`w-4 h-4 ${isRTL ? "ml-2" : "mr-2"}`} />
              {t.badges.communityTrading}
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              <Trophy className={`w-4 h-4 ${isRTL ? "ml-2" : "mr-2"}`} />
              {t.badges.gamifiedRewards}
            </Badge>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Button
              size="lg"
              className="luxury-button text-lg px-8 py-6"
              onClick={() => navigate("/srs")}
            >
              {t.hero.startLearning}
              <ChevronRight className={`w-5 h-5 ${isRTL ? "mr-2" : "ml-2"}`} />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 border-2"
              onClick={() => navigate("/about")}
            >
              {t.hero.learnMore}
            </Button>
          </div>

          {/* Social Proof */}
          <div className="flex items-center justify-center gap-8 pt-12 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 fill-accent text-accent" />
              <span className="font-semibold text-foreground">{t.hero.premiumLearning}</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-border" />
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-accent" />
              <span className="font-semibold text-foreground">{t.hero.gulfFocused}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 bg-card/30">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              {t.features.title}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.features.subtitle}
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
                  {t.features.intelligentSRS.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t.features.intelligentSRS.desc}
                </p>
              </div>
            </Card>

            <Card className="flashcard group">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-[var(--card-shadow)]">
                  <Zap className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  {t.features.offlineFirst.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t.features.offlineFirst.desc}
                </p>
              </div>
            </Card>

            <Card className="flashcard group">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent to-accent/70 flex items-center justify-center shadow-[var(--luxury-shadow)]">
                  <Trophy className="w-7 h-7 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  {t.features.gamifiedRewards.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t.features.gamifiedRewards.desc}
                </p>
              </div>
            </Card>

            <Card className="flashcard group">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-[var(--card-shadow)]">
                  <Users className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  {t.features.communityTrading.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t.features.communityTrading.desc}
                </p>
              </div>
            </Card>

            <Card className="flashcard group">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent to-accent/70 flex items-center justify-center shadow-[var(--luxury-shadow)]">
                  <BookOpen className="w-7 h-7 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  {t.features.curatedContent.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t.features.curatedContent.desc}
                </p>
              </div>
            </Card>

            <Card className="flashcard group">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-[var(--card-shadow)]">
                  <Sparkles className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  {t.features.luxuriousExperience.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t.features.luxuriousExperience.desc}
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
              {t.journey.title}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.journey.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
            {[
              {
                step: "01",
                icon: Target,
                title: t.journey.step1.title,
                description: t.journey.step1.desc,
              },
              {
                step: "02",
                icon: Brain,
                title: t.journey.step2.title,
                description: t.journey.step2.desc,
              },
              {
                step: "03",
                icon: Award,
                title: t.journey.step3.title,
                description: t.journey.step3.desc,
              },
              {
                step: "04",
                icon: MessageSquare,
                title: t.journey.step4.title,
                description: t.journey.step4.desc,
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

      {/* Support Our Development Section */}
      <section className="py-24 px-4 bg-card/30">
        <div className="max-w-6xl mx-auto space-y-12">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-foreground">
            {t.support.title}
          </h2>
          
          {/* Email Input */}
          <div className="max-w-md mx-auto">
            <Input
              type="email"
              placeholder={t.support.emailPlaceholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-center text-lg py-6"
            />
          </div>

          {/* Support Frames */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Fund Our Launch Frame */}
            <Card className="flashcard group hover:scale-105 transition-all duration-300">
              <div className="space-y-6 p-6">
                <h3 className="text-2xl font-bold text-center text-foreground">
                  {t.support.fundLaunch}
                </h3>
                <div className="space-y-3">
                  {[
                    { label: t.support.hosting, clickable: false },
                    { label: t.support.database, clickable: false },
                    { label: t.support.developerTools, clickable: false },
                    { label: t.support.userAcquisition, clickable: true },
                  ].map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => item.clickable && setShowAcquisitionModal(true)}
                      className={`w-full px-4 py-3 border-2 border-border rounded-lg text-sm font-medium transition-all ${
                        item.clickable
                          ? "hover:bg-accent hover:text-accent-foreground hover:border-accent cursor-pointer"
                          : "cursor-default"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
                <p className="text-center text-sm text-muted-foreground">
                  {t.support.monthlyLabel}
                </p>
              </div>
            </Card>

            {/* Evaluate & Collaborate Frame */}
            <Card className="flashcard group hover:scale-105 transition-all duration-300">
              <div className="space-y-6 p-6 flex flex-col justify-between h-full">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-center text-foreground">
                    {t.support.evaluateTitle}
                  </h3>
                  <div className="flex items-center justify-center">
                    <div className="text-6xl font-bold text-foreground border-4 border-border rounded-lg px-8 py-4">
                      VISIT
                    </div>
                  </div>
                </div>
                <Button
                  size="lg"
                  className="luxury-button w-full text-lg"
                  onClick={() => navigate("/")}
                >
                  {t.support.visit}
                  <ChevronRight className={`w-5 h-5 ${isRTL ? "mr-2" : "ml-2"}`} />
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4 bg-gradient-to-br from-primary to-primary/90 text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold">
            {t.cta.title}
          </h2>
          <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto leading-relaxed">
            {t.cta.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              size="lg"
              variant="secondary"
              className="text-lg px-8 py-6 bg-card text-card-foreground hover:bg-card/90"
              onClick={() => navigate("/")}
            >
              {t.cta.getStarted}
              <ChevronRight className={`w-5 h-5 ${isRTL ? "mr-2" : "ml-2"}`} />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              onClick={() => navigate("/forum")}
            >
              {t.cta.exploreCommunity}
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-card/50 border-t">
        <div className="max-w-6xl mx-auto text-center space-y-4">
          <div className="flex justify-center items-center gap-2">
            <img src={dallahLogo} alt="Gulfara Logo" className="w-8 h-8" />
            <h3 className="text-2xl font-bold text-foreground">Gulfara</h3>
            <span className="text-xl text-muted-foreground" dir="rtl">غلفارا</span>
          </div>
          <p className="text-sm text-muted-foreground">
            {t.footer.subtitle}
          </p>
          <div className="flex justify-center gap-6 text-sm text-muted-foreground">
            <button onClick={() => navigate("/about")} className="hover:text-foreground transition-colors">
              {t.footer.about}
            </button>
            <button onClick={() => navigate("/forum")} className="hover:text-foreground transition-colors">
              {t.footer.forum}
            </button>
            <button onClick={() => navigate("/rewards")} className="hover:text-foreground transition-colors">
              {t.footer.rewards}
            </button>
          </div>
        </div>
      </footer>

      {/* User Acquisition Modal */}
      <Dialog open={showAcquisitionModal} onOpenChange={setShowAcquisitionModal}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-2xl font-bold">{t.support.acquisitionModalTitle}</DialogTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowAcquisitionModal(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            <DialogDescription>
              {t.support.acquisitionModalDesc}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 pt-4">
            {/* Calculations Table */}
            <div className="bg-card/50 rounded-lg p-6 space-y-4">
              <h3 className="text-lg font-bold text-foreground">
                {language === "en" 
                  ? "Calculations (Impressions = Budget ÷ CPM × 1,000):" 
                  : "الحسابات (الظهورات = الميزانية ÷ تكلفة الألف ظهور × ١٬٠٠٠):"}
              </h3>
              
              {/* Table Header */}
              <div className="grid grid-cols-3 gap-4 pb-2 border-b">
                <div className="font-semibold text-foreground">{t.support.targeting}</div>
                <div className="font-semibold text-foreground">{t.support.cpm}</div>
                <div className="font-semibold text-foreground">{t.support.impressions}</div>
              </div>
              
              {/* Table Rows */}
              <div className="grid grid-cols-3 gap-4 py-3 border-b">
                <div className="text-muted-foreground">{t.support.broad}</div>
                <div className="text-foreground">$1.50</div>
                <div className="text-foreground">≈ 120,000</div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 py-3 border-b">
                <div className="text-muted-foreground">{t.support.interestBased}</div>
                <div className="text-foreground">$3.00</div>
                <div className="text-foreground">≈ 60,000</div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 py-3">
                <div className="text-muted-foreground">{t.support.nicheSubreddit}</div>
                <div className="text-foreground">$5.00</div>
                <div className="text-foreground">≈ 36,000</div>
              </div>
            </div>

            {/* Summary Section */}
            <div className="bg-card/50 rounded-lg p-6 space-y-4">
              <h3 className="text-lg font-bold text-foreground">{t.support.summaryTitle}</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-accent">•</span>
                  <span>{t.support.summaryRange}</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-accent">•</span>
                  <span>{t.support.summaryStrategy}</span>
                </li>
              </ul>
            </div>

            <Button
              size="lg"
              className="w-full luxury-button"
              onClick={() => setShowAcquisitionModal(false)}
            >
              {t.support.close}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Landing;
