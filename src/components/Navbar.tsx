import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  const navLinks = [
    { href: "/map", label: "Map" },
    { href: "/candidates", label: "Candidates" },
    { href: "/results", label: "Results" },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all ${isHome ? '' : 'bg-background/95 backdrop-blur border-b border-border'}`}>
      <div className="container flex h-14 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl">🚕</span>
          <div className="flex flex-col leading-none">
            <span className={`text-xs font-medium tracking-wider ${isHome ? 'text-accent' : 'text-accent'}`}>aamchi</span>
            <span className={`font-heading font-bold text-lg ${isHome ? 'text-primary-foreground' : 'text-foreground'}`}>मुंबई</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                location.pathname === link.href
                  ? 'bg-accent text-accent-foreground'
                  : isHome 
                    ? 'text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className={`md:hidden ${isHome ? 'text-primary-foreground hover:bg-primary-foreground/10' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className={`md:hidden border-t animate-fade-in ${isHome ? 'bg-primary/95 backdrop-blur border-primary-foreground/20' : 'bg-background border-border'}`}>
          <nav className="container flex flex-col gap-2 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`px-4 py-3 rounded-lg text-sm font-medium ${
                  location.pathname === link.href
                    ? 'bg-accent text-accent-foreground'
                    : isHome 
                      ? 'text-primary-foreground hover:bg-primary-foreground/10'
                      : 'text-foreground hover:bg-secondary'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
