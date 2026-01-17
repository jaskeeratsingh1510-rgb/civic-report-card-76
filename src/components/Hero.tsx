import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, TrendingUp, Users } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative overflow-hidden gradient-hero">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-foreground rounded-full blur-3xl" />
      </div>

      <div className="container relative py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-foreground/10 border border-accent-foreground/20 text-accent-foreground text-sm font-medium mb-8 animate-fade-up">
            <span className="flex h-2 w-2 rounded-full bg-accent animate-pulse-gentle" />
            Empowering Informed Democracy
          </div>

          {/* Headline */}
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            Your Digital Report Card for{" "}
            <span className="text-accent">Election Candidates</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: '0.2s' }}>
            Track manifesto promises, verify fund utilization, and make informed voting decisions with transparent, data-driven insights.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <Button variant="hero" size="xl">
              Explore Candidates
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button variant="heroOutline" size="xl">
              How It Works
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto animate-fade-up" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-primary-foreground/10 backdrop-blur-sm">
              <Users className="h-8 w-8 text-accent" />
              <div className="text-left">
                <p className="text-2xl font-bold text-primary-foreground">2,500+</p>
                <p className="text-sm text-primary-foreground/70">Candidates Tracked</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-primary-foreground/10 backdrop-blur-sm">
              <CheckCircle className="h-8 w-8 text-accent" />
              <div className="text-left">
                <p className="text-2xl font-bold text-primary-foreground">15,000+</p>
                <p className="text-sm text-primary-foreground/70">Promises Monitored</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-primary-foreground/10 backdrop-blur-sm">
              <TrendingUp className="h-8 w-8 text-accent" />
              <div className="text-left">
                <p className="text-2xl font-bold text-primary-foreground">₹50Cr+</p>
                <p className="text-sm text-primary-foreground/70">Funds Tracked</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V120Z" fill="hsl(var(--background))" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
