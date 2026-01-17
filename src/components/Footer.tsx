import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Twitter, Facebook, Linkedin, Github, ArrowRight } from "lucide-react";

const Footer = () => {
  return (
    <footer className="gradient-hero text-primary-foreground">
      <div className="container py-16">
        {/* Newsletter Section */}
        <div className="text-center mb-16 pb-16 border-b border-primary-foreground/20">
          <h3 className="font-heading text-2xl md:text-3xl font-bold mb-4">
            Stay Informed, Stay Empowered
          </h3>
          <p className="text-primary-foreground/70 max-w-lg mx-auto mb-6">
            Get weekly updates on candidate performance, fund utilization, and civic insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 h-12"
            />
            <Button variant="hero" size="lg" className="gap-2">
              Subscribe
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h4 className="font-heading font-bold mb-4">Platform</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm">Candidates</a></li>
              <li><a href="#" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm">Promise Tracker</a></li>
              <li><a href="#" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm">Fund Dashboard</a></li>
              <li><a href="#" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm">Public Voice</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading font-bold mb-4">Resources</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm">How It Works</a></li>
              <li><a href="#" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm">Data Sources</a></li>
              <li><a href="#" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm">API Access</a></li>
              <li><a href="#" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm">Research</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading font-bold mb-4">Organization</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm">About Us</a></li>
              <li><a href="#" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm">Our Mission</a></li>
              <li><a href="#" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm">Partners</a></li>
              <li><a href="#" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm">Careers</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading font-bold mb-4">Legal</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm">Privacy Policy</a></li>
              <li><a href="#" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm">Terms of Service</a></li>
              <li><a href="#" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm">Data Policy</a></li>
              <li><a href="#" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm">Contact</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-primary-foreground/20">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
              <span className="text-sm font-bold text-accent-foreground">NC</span>
            </div>
            <span className="font-heading text-lg font-bold">NētāCheck</span>
          </div>

          <p className="text-sm text-primary-foreground/60">
            © 2025 NētāCheck. Empowering democracy through transparency.
          </p>

          <div className="flex items-center gap-4">
            <a href="#" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="#" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="#" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
              <Github className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
