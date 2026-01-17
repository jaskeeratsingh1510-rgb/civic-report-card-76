import { Button } from "@/components/ui/button";
import { Search, Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <span className="text-lg font-bold text-primary-foreground">NC</span>
          </div>
          <span className="font-heading text-xl font-bold text-foreground">
            NētāCheck
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#candidates" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Candidates
          </a>
          <a href="#promises" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Promise Tracker
          </a>
          <a href="#funds" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Fund Dashboard
          </a>
          <a href="#feedback" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Public Voice
          </a>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="sm">Sign In</Button>
          <Button size="sm">Get Started</Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border bg-background animate-fade-in">
          <nav className="container flex flex-col gap-4 py-4">
            <a href="#candidates" className="text-sm font-medium text-foreground">Candidates</a>
            <a href="#promises" className="text-sm font-medium text-foreground">Promise Tracker</a>
            <a href="#funds" className="text-sm font-medium text-foreground">Fund Dashboard</a>
            <a href="#feedback" className="text-sm font-medium text-foreground">Public Voice</a>
            <div className="flex gap-3 pt-2">
              <Button variant="outline" size="sm" className="flex-1">Sign In</Button>
              <Button size="sm" className="flex-1">Get Started</Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
