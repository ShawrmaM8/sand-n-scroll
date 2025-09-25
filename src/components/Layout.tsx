import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu, X, Home, BookOpen, Gift, MessageSquare, User, Coins, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { NavLink } from "react-router-dom";

const navItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "SRS Study", url: "/srs", icon: BookOpen },
  { title: "Decks", url: "/decks", icon: BookOpen },
  { title: "Rewards", url: "/rewards", icon: Gift },
  { title: "Forum", url: "/forum", icon: MessageSquare },
  { title: "Profile", url: "/profile", icon: User },
];

export default function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Mock user data - in real app this would come from context/store
  const coins = 1247;
  const streak = 12;

  return (
    <div className="min-h-screen bg-background geometric-pattern">
      {/* Top Navigation Bar */}
      <header className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-bold text-foreground">عربي SRS</h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.url}
                  to={item.url}
                  className={({ isActive }) =>
                    `nav-item ${isActive ? 'active' : ''}`
                  }
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.title}</span>
                </NavLink>
              ))}
            </nav>

            {/* Stats & Mobile Menu */}
            <div className="flex items-center space-x-4">
              {/* Stats Display */}
              <div className="hidden sm:flex items-center space-x-3">
                <div className="coin-counter flex items-center space-x-1">
                  <Coins className="w-4 h-4" />
                  <span>{coins.toLocaleString()}</span>
                </div>
                <div className="streak-badge flex items-center space-x-1">
                  <Flame className="w-4 h-4" />
                  <span>{streak}</span>
                </div>
              </div>

              {/* Mobile Menu */}
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild className="md:hidden">
                  <Button variant="ghost" size="icon">
                    <Menu className="w-6 h-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80">
                  <SheetHeader>
                    <SheetTitle className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <span>عربي SRS</span>
                    </SheetTitle>
                  </SheetHeader>
                  
                  {/* Mobile Stats */}
                  <div className="flex items-center justify-center space-x-4 mt-6 mb-8">
                    <div className="coin-counter flex items-center space-x-1">
                      <Coins className="w-4 h-4" />
                      <span>{coins.toLocaleString()}</span>
                    </div>
                    <div className="streak-badge flex items-center space-x-1">
                      <Flame className="w-4 h-4" />
                      <span>{streak}</span>
                    </div>
                  </div>

                  {/* Mobile Navigation */}
                  <nav className="space-y-2">
                    {navItems.map((item) => (
                      <NavLink
                        key={item.url}
                        to={item.url}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={({ isActive }) =>
                          `nav-item w-full ${isActive ? 'active' : ''}`
                        }
                      >
                        <item.icon className="w-5 h-5" />
                        <span className="font-medium">{item.title}</span>
                      </NavLink>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}