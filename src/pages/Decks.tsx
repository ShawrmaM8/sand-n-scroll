import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Plus, Download, Eye } from "lucide-react";

export default function Decks() {
  const decks = [
    { id: 1, name: "Basic Vocabulary", cards: 50, progress: 80 },
    { id: 2, name: "Common Phrases", cards: 30, progress: 60 },
    { id: 3, name: "Grammar Essentials", cards: 40, progress: 45 },
    { id: 4, name: "Advanced Words", cards: 70, progress: 20 },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Study Decks</h1>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Import Deck
          </Button>
          <Button className="luxury-button">
            <Plus className="w-4 h-4 mr-2" />
            Create Deck
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {decks.map((deck) => (
          <Card key={deck.id} className="flashcard">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-primary" />
                <span>{deck.name}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-muted-foreground">
                {deck.cards} cards • {deck.progress}% complete
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="w-4 h-4 mr-1" />
                  Preview
                </Button>
                <Button size="sm" className="flex-1">
                  Study
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}