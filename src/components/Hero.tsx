import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image - Mumbai CST Station */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=2070&auto=format&fit=crop')`,
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 hero-overlay" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Aamchi label */}
        <p className="text-accent font-medium tracking-[0.3em] uppercase text-sm md:text-base mb-4 animate-fade-up">
          aamchi
        </p>

        {/* Mumbai in Devanagari */}
        <h1 className="font-heading text-[80px] md:text-[140px] lg:text-[180px] font-bold text-primary-foreground leading-none mb-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
          मुंबई
        </h1>

        {/* Tagline */}
        <p className="text-xl md:text-2xl text-primary-foreground font-medium mb-3 animate-fade-up" style={{ animationDelay: '0.2s' }}>
          Know your ward. Know your corporator.
        </p>

        {/* Description */}
        <p className="text-primary-foreground/70 text-base md:text-lg max-w-xl mx-auto mb-10 animate-fade-up" style={{ animationDelay: '0.3s' }}>
          Navigate through 227 electoral wards and hold your representatives accountable
        </p>

        {/* CTA Button */}
        <div className="animate-fade-up" style={{ animationDelay: '0.4s' }}>
          <Button 
            size="lg" 
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-full px-8 py-6 text-base font-medium gap-3 group"
          >
            <span className="text-xl">🚕</span>
            Explore Your Ward
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

        {/* Bottom text */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-up" style={{ animationDelay: '0.5s' }}>
          <p className="text-primary-foreground/60 text-sm mb-3">
            Open data for civic transparency
          </p>
          <Button 
            variant="outline" 
            size="sm"
            className="border-primary-foreground/30 text-primary-foreground/80 hover:bg-primary-foreground/10 rounded-full uppercase tracking-wider text-xs"
          >
            Resources and Credits
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
