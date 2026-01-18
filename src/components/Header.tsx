import { Button } from "@/components/ui/button";
import { Menu, X, ExternalLink } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="container flex h-14 items-center justify-between py-3">
        {/* Empty left side for balance */}
        <div className="w-32" />

        {/* Right side actions */}
        <div className="hidden md:flex items-center gap-4">
          <a 
            href="https://twitter.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
          <span className="text-primary-foreground/60 text-sm">
            By - Team MumbaiWatch
          </span>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-primary-foreground hover:bg-primary-foreground/10"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-primary/95 backdrop-blur animate-fade-in">
          <nav className="container flex flex-col gap-4 py-4">
            <a href="#wards" className="text-sm font-medium text-primary-foreground">Explore Wards</a>
            <a href="#corporators" className="text-sm font-medium text-primary-foreground">Corporators</a>
            <a href="#promises" className="text-sm font-medium text-primary-foreground">Promise Tracker</a>
            <a href="#funds" className="text-sm font-medium text-primary-foreground">Fund Dashboard</a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
