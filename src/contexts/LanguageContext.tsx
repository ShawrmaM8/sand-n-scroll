import { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageContextType {
  language: 'en' | 'ar';
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Auth
    welcome: "Welcome",
    login: "Login",
    signup: "Sign Up",
    loginDesc: "Enter your credentials to access your account",
    signupDesc: "Create a new account to get started",
    username: "Username",
    email: "Email",
    password: "Password",
    enterUsername: "Enter your username",
    enterEmail: "Enter your email",
    enterPassword: "Enter your password",
    loading: "Loading...",
    loginSuccess: "Successfully logged in!",
    signupSuccess: "Account created successfully!",
    error: "Error",
    needAccount: "Need an account? Sign up",
    haveAccount: "Already have an account? Login",
    
    // Text Input
    inputText: "Input Text",
    inputTextDesc: "Upload or paste text to generate flashcards",
    pasteText: "Paste your text here",
    textPlaceholder: "Enter or paste Arabic text to generate flashcards...",
    flashcardCount: "Number of Flashcards",
    generateFlashcards: "Generate Flashcards",
    generating: "Generating...",
    enterText: "Please enter some text",
    flashcardsGenerated: "Flashcards generated successfully!",
    
    // Flashcard Review
    reviewFlashcards: "Review Flashcards",
    card: "Card",
    showAnswer: "Show Answer",
    showQuestion: "Show Question",
    previous: "Previous",
    next: "Next",
    goToScenarios: "Go to Scenarios",
    
    // Scenario Mode
    scenarioMode: "Scenario Mode",
    scenarioModeDesc: "Test your knowledge in realistic situations",
    easy: "Easy",
    medium: "Medium",
    hard: "Hard",
    easyDesc: "Basic application of concepts",
    mediumDesc: "Moderate challenge with context",
    hardDesc: "Advanced real-world scenarios",
    points: "points",
    previousScenarios: "Previous Scenarios",
    takeTest: "Take Test",
    scenarioGenerated: "Scenario generated successfully!",
    
    // Scenario Test
    question: "Question",
    finish: "Finish",
    testCompleted: "Test Completed!",
    correctAnswers: "Correct Answers",
    earned: "You earned",
    goHome: "Go Home",
    retake: "Retake Test",
    
    // Navigation
    home: "Home",
    profile: "Profile",
    rewards: "Rewards",
    logout: "Logout",
    
    // Profile
    editProfile: "Edit Profile",
    shareStats: "Share Stats",
    coins: "Coins",
    level: "Level",
    streak: "Day Streak",
    badges: "Badges",
    sessions: "Sessions Completed",
    description: "Description",
    country: "Country",
    
    // Rewards
    rewardsShop: "Rewards Shop",
    rewardsDesc: "Redeem your coins for exclusive rewards",
    unlockBadge: "Unlock Badge",
    unlockAvatar: "Unlock Avatar",
    session: "Session",
    coinsAvailable: "coins available",
    purchase: "Purchase",
    
    // Dashboard
    startLearning: "Start Learning",
    continueSession: "Continue Session",
    mySessions: "My Sessions",
    
    // Landing
    appName: "Botaqiq",
    tagline: "Arabic, Your Way",
    heroTitle: "Master Arabic Through Adaptive Learning",
    heroDesc: "Transform any text into personalized flashcards and realistic scenarios. Learn at your own pace with AI-powered adaptive difficulty.",
    getStarted: "Get Started",
    learnMore: "Learn More",
    
    // About
    aboutApp: "About Botaqiq",
    appVision: "Our Vision",
    howItWorks: "How It Works",
    contactUs: "Contact Us",
  },
  ar: {
    // Auth
    welcome: "مرحباً",
    login: "تسجيل الدخول",
    signup: "إنشاء حساب",
    loginDesc: "أدخل بياناتك للدخول إلى حسابك",
    signupDesc: "أنشئ حساباً جديداً للبدء",
    username: "اسم المستخدم",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    enterUsername: "أدخل اسم المستخدم",
    enterEmail: "أدخل البريد الإلكتروني",
    enterPassword: "أدخل كلمة المرور",
    loading: "جارٍ التحميل...",
    loginSuccess: "تم تسجيل الدخول بنجاح!",
    signupSuccess: "تم إنشاء الحساب بنجاح!",
    error: "خطأ",
    needAccount: "تحتاج إلى حساب؟ سجّل الآن",
    haveAccount: "لديك حساب؟ سجّل الدخول",
    
    // Text Input
    inputText: "إدخال النص",
    inputTextDesc: "قم بتحميل أو لصق نص لإنشاء بطاقات تعليمية",
    pasteText: "الصق نصك هنا",
    textPlaceholder: "أدخل أو الصق نصاً عربياً لإنشاء بطاقات تعليمية...",
    flashcardCount: "عدد البطاقات",
    generateFlashcards: "إنشاء البطاقات",
    generating: "جارٍ الإنشاء...",
    enterText: "يرجى إدخال نص",
    flashcardsGenerated: "تم إنشاء البطاقات بنجاح!",
    
    // Flashcard Review
    reviewFlashcards: "مراجعة البطاقات",
    card: "بطاقة",
    showAnswer: "إظهار الإجابة",
    showQuestion: "إظهار السؤال",
    previous: "السابق",
    next: "التالي",
    goToScenarios: "الذهاب إلى السيناريوهات",
    
    // Scenario Mode
    scenarioMode: "وضع السيناريو",
    scenarioModeDesc: "اختبر معرفتك في مواقف واقعية",
    easy: "سهل",
    medium: "متوسط",
    hard: "صعب",
    easyDesc: "تطبيق أساسي للمفاهيم",
    mediumDesc: "تحدٍ متوسط مع سياق",
    hardDesc: "سيناريوهات متقدمة من العالم الواقعي",
    points: "نقاط",
    previousScenarios: "السيناريوهات السابقة",
    takeTest: "خوض الاختبار",
    scenarioGenerated: "تم إنشاء السيناريو بنجاح!",
    
    // Scenario Test
    question: "سؤال",
    finish: "إنهاء",
    testCompleted: "اكتمل الاختبار!",
    correctAnswers: "الإجابات الصحيحة",
    earned: "لقد ربحت",
    goHome: "العودة للرئيسية",
    retake: "إعادة الاختبار",
    
    // Navigation
    home: "الرئيسية",
    profile: "الملف الشخصي",
    rewards: "المكافآت",
    logout: "تسجيل الخروج",
    
    // Profile
    editProfile: "تعديل الملف",
    shareStats: "مشاركة الإحصائيات",
    coins: "العملات",
    level: "المستوى",
    streak: "السلسلة اليومية",
    badges: "الشارات",
    sessions: "الجلسات المكتملة",
    description: "الوصف",
    country: "البلد",
    
    // Rewards
    rewardsShop: "متجر المكافآت",
    rewardsDesc: "استبدل عملاتك بمكافآت حصرية",
    unlockBadge: "فتح شارة",
    unlockAvatar: "فتح صورة رمزية",
    session: "جلسة",
    coinsAvailable: "عملة متاحة",
    purchase: "شراء",
    
    // Dashboard
    startLearning: "بدء التعلم",
    continueSession: "متابعة الجلسة",
    mySessions: "جلساتي",
    
    // Landing
    appName: "بطاقي",
    tagline: "العربية، بطريقتك",
    heroTitle: "إتقان العربية من خلال التعلم التكيفي",
    heroDesc: "حوّل أي نص إلى بطاقات تعليمية مخصصة وسيناريوهات واقعية. تعلم بسرعتك الخاصة مع صعوبة تكيفية مدعومة بالذكاء الاصطناعي.",
    getStarted: "ابدأ الآن",
    learnMore: "اعرف المزيد",
    
    // About
    aboutApp: "حول بطاقي",
    appVision: "رؤيتنا",
    howItWorks: "كيف يعمل",
    contactUs: "اتصل بنا",
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<'en' | 'ar'>('en');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ar' : 'en');
    document.documentElement.dir = language === 'en' ? 'rtl' : 'ltr';
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}