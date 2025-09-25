import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Coins, Flame, BookOpen, Target, Star, Shield, Award } from "lucide-react";

export default function Profile() {
  const stats = {
    totalCoins: 1247,
    currentStreak: 12,
    totalCards: 189,
    accuracy: 87,
    level: 7,
    xp: 3450
  };

  const badges = [
    { name: "First Steps", icon: Star, earned: true },
    { name: "Week Warrior", icon: Shield, earned: true },
    { name: "Coin Collector", icon: Coins, earned: true },
    { name: "Perfect Week", icon: Award, earned: false },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Profile Header */}
      <Card className="flashcard">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            <Avatar className="w-24 h-24">
              <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                U
              </AvatarFallback>
            </Avatar>
            
            <div className="text-center md:text-left space-y-2 flex-1">
              <h1 className="text-3xl font-bold">User</h1>
              <p className="text-muted-foreground">Arabic Learning Enthusiast</p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <div className="coin-counter">
                  <Coins className="w-4 h-4 mr-1" />
                  {stats.totalCoins} coins
                </div>
                <div className="streak-badge">
                  <Flame className="w-4 h-4 mr-1" />
                  {stats.currentStreak} day streak
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-accent">Level {stats.level}</div>
              <p className="text-sm text-muted-foreground">{stats.xp} XP</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="text-center p-4">
          <div className="space-y-2">
            <BookOpen className="w-8 h-8 mx-auto text-primary" />
            <div className="text-2xl font-bold">{stats.totalCards}</div>
            <p className="text-sm text-muted-foreground">Cards Studied</p>
          </div>
        </Card>
        
        <Card className="text-center p-4">
          <div className="space-y-2">
            <Target className="w-8 h-8 mx-auto text-success" />
            <div className="text-2xl font-bold">{stats.accuracy}%</div>
            <p className="text-sm text-muted-foreground">Accuracy</p>
          </div>
        </Card>
        
        <Card className="text-center p-4">
          <div className="space-y-2">
            <Flame className="w-8 h-8 mx-auto text-streak-fire" />
            <div className="text-2xl font-bold">{stats.currentStreak}</div>
            <p className="text-sm text-muted-foreground">Day Streak</p>
          </div>
        </Card>
        
        <Card className="text-center p-4">
          <div className="space-y-2">
            <Coins className="w-8 h-8 mx-auto text-coin-gold" />
            <div className="text-2xl font-bold">{stats.totalCoins}</div>
            <p className="text-sm text-muted-foreground">Total Coins</p>
          </div>
        </Card>
      </div>

      {/* Badges */}
      <Card className="flashcard">
        <CardHeader>
          <CardTitle>Achievement Badges</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {badges.map((badge) => (
              <div 
                key={badge.name} 
                className={`text-center p-4 rounded-xl border ${
                  badge.earned 
                    ? 'bg-accent/10 border-accent' 
                    : 'bg-muted/50 border-muted'
                }`}
              >
                <badge.icon 
                  className={`w-8 h-8 mx-auto mb-2 ${
                    badge.earned ? 'text-accent' : 'text-muted-foreground'
                  }`} 
                />
                <p className={`text-sm font-medium ${
                  badge.earned ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {badge.name}
                </p>
                {badge.earned && (
                  <Badge variant="secondary" className="mt-1 text-xs">
                    Earned
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}