import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Heart, Reply, Plus } from "lucide-react";

export default function Forum() {
  const posts = [
    {
      id: 1,
      author: "Ahmad",
      title: "Best way to memorize Arabic verbs?",
      content: "I'm struggling with verb conjugations. Any tips?",
      likes: 12,
      replies: 5,
      time: "2h ago"
    },
    {
      id: 2,
      author: "Sarah",
      title: "Looking for study partners",
      content: "Anyone interested in forming a study group?",
      likes: 8,
      replies: 3,
      time: "4h ago"
    },
    {
      id: 3,
      author: "Omar",
      title: "Deck Trade: Classical Arabic Poetry",
      content: "Trading my poetry deck for modern vocabulary",
      likes: 15,
      replies: 7,
      time: "6h ago"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Community Forum</h1>
        <Button className="luxury-button">
          <Plus className="w-4 h-4 mr-2" />
          New Post
        </Button>
      </div>

      <div className="space-y-6">
        {posts.map((post) => (
          <Card key={post.id} className="flashcard">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="font-semibold text-lg">{post.title}</h3>
                  <p className="text-sm text-muted-foreground">by {post.author} • {post.time}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{post.content}</p>
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm">
                  <Heart className="w-4 h-4 mr-1" />
                  {post.likes}
                </Button>
                <Button variant="ghost" size="sm">
                  <Reply className="w-4 h-4 mr-1" />
                  {post.replies} replies
                </Button>
                <Button variant="ghost" size="sm">
                  <MessageSquare className="w-4 h-4 mr-1" />
                  Comment
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}