import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThumbsUp, MessageCircle, Shield, ArrowRight, Star } from "lucide-react";

const feedbackItems = [
  {
    id: 1,
    user: {
      name: "Vikram Mehta",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      verified: true,
      location: "Mumbai North West",
    },
    candidate: "Rajesh Kumar Singh",
    rating: 4,
    content: "The new street lights in our area have made a real difference. Night travel feels much safer now. However, the drainage project is still pending after 2 years.",
    likes: 234,
    replies: 18,
    date: "2 days ago",
    tags: ["Infrastructure", "Safety"],
  },
  {
    id: 2,
    user: {
      name: "Anita Deshmukh",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
      verified: true,
      location: "Delhi South",
    },
    candidate: "Priya Sharma",
    rating: 5,
    content: "Impressed with the new government school that opened in our locality. Quality education is now accessible to many children who couldn't afford private schools.",
    likes: 412,
    replies: 45,
    date: "5 days ago",
    tags: ["Education", "Development"],
  },
  {
    id: 3,
    user: {
      name: "Ramesh Gupta",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face",
      verified: true,
      location: "Ahmedabad East",
    },
    candidate: "Arun Patel",
    rating: 2,
    content: "The health center promise was made 3 years ago but we're still waiting. Many villagers have to travel 20km for basic medical care. This needs urgent attention.",
    likes: 567,
    replies: 89,
    date: "1 week ago",
    tags: ["Healthcare", "Concern"],
  },
];

const PublicFeedback = () => {
  return (
    <section id="feedback" className="py-20 bg-secondary/30">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            Public Voice
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Verified Citizen Feedback
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real experiences from verified voters. Every voice matters in 
            building a transparent democracy.
          </p>
        </div>

        {/* Trust Indicator */}
        <div className="flex items-center justify-center gap-2 mb-10">
          <Shield className="h-5 w-5 text-accent" />
          <span className="text-sm text-muted-foreground">
            All feedback is verified through Aadhaar-based authentication
          </span>
        </div>

        {/* Feedback Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-10">
          {feedbackItems.map((item) => (
            <div
              key={item.id}
              className="bg-card rounded-2xl p-6 shadow-card border border-border/50 hover:shadow-elevated transition-all duration-300"
            >
              {/* Header */}
              <div className="flex items-start gap-3 mb-4">
                <Avatar className="h-12 w-12 border-2 border-border">
                  <AvatarImage src={item.user.avatar} alt={item.user.name} />
                  <AvatarFallback>{item.user.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-foreground truncate">
                      {item.user.name}
                    </h4>
                    {item.user.verified && (
                      <Shield className="h-4 w-4 text-accent flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {item.user.location}
                  </p>
                </div>
              </div>

              {/* Rating & Candidate */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < item.rating
                          ? "text-warning fill-warning"
                          : "text-muted"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">
                  Re: {item.candidate}
                </span>
              </div>

              {/* Content */}
              <p className="text-foreground text-sm leading-relaxed mb-4">
                {item.content}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {item.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-1.5 text-muted-foreground hover:text-accent transition-colors">
                    <ThumbsUp className="h-4 w-4" />
                    <span className="text-sm">{item.likes}</span>
                  </button>
                  <button className="flex items-center gap-1.5 text-muted-foreground hover:text-accent transition-colors">
                    <MessageCircle className="h-4 w-4" />
                    <span className="text-sm">{item.replies}</span>
                  </button>
                </div>
                <span className="text-xs text-muted-foreground">{item.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button variant="default" size="lg" className="gap-2">
            Share Your Experience
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PublicFeedback;
