import { Button } from "@/components/ui/button";
import { Twitter, Github, ExternalLink, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container py-12">
        {/* Main Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8 pb-8 border-b border-primary-foreground/20">
          {/* Logo */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <span className="text-2xl">🚕</span>
              <span className="font-heading text-2xl font-bold">MumbaiWatch</span>
            </div>
            <p className="text-primary-foreground/60 text-sm">
              Open data for civic transparency
            </p>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-6">
            <a href="#wards" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
              Explore Wards
            </a>
            <a href="#corporators" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
              Corporators
            </a>
            <a href="#promises" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
              Promise Tracker
            </a>
            <a href="#funds" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
              Fund Dashboard
            </a>
            <a href="#" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
              Sources & Credits
            </a>
          </nav>

          {/* Social */}
          <div className="flex items-center gap-4">
            <a 
              href="#" 
              className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a 
              href="#" 
              className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
            <a 
              href="#" 
              className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors"
            >
              <ExternalLink className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Support Section */}
        <div className="bg-primary-foreground/5 rounded-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                <Heart className="h-5 w-5 text-destructive" />
                <h3 className="font-heading font-bold text-lg">Support the Project</h3>
              </div>
              <p className="text-primary-foreground/60 text-sm max-w-md">
                Running this platform requires time and resources. We will only accept support until our website costs are covered.
              </p>
            </div>
            <Button 
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-full"
            >
              Support Project
              <ExternalLink className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-primary-foreground/60">
          <p>© 2025 MumbaiWatch. Built for civic transparency.</p>
          <p>Data sourced from MCGM, Election Commission of India, and public records.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
