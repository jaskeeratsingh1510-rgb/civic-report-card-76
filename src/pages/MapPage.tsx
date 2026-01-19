import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import MumbaiMap from "@/components/MumbaiMap";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Search } from "lucide-react";
import { type WardResult } from "@/data/candidates";

const MapPage = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"electoral" | "plain" | "results">("electoral");
  const [hoveredWard, setHoveredWard] = useState<number | null>(null);
  const [hoveredResult, setHoveredResult] = useState<WardResult | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleWardHover = useCallback((ward: number | null, result?: WardResult) => {
    setHoveredWard(ward);
    setHoveredResult(result || null);
  }, []);

  const handleWardClick = useCallback((ward: number) => {
    navigate(`/candidates?ward=${ward}`);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-14">
        {/* Controls */}
        <div className="sticky top-14 z-40 bg-background border-b border-border py-3">
          <div className="container flex flex-wrap items-center gap-3">
            {/* View Mode Toggle */}
            <div className="flex bg-secondary rounded-full p-1">
              <button
                onClick={() => setViewMode("electoral")}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  viewMode === "electoral" ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Electoral
              </button>
              <button
                onClick={() => setViewMode("plain")}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  viewMode === "plain" ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Plain
              </button>
              <button
                onClick={() => setViewMode("results")}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  viewMode === "results" ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Results
              </button>
            </div>

            {/* My Ward Button */}
            <Button variant="outline" size="sm" className="rounded-full gap-2">
              <MapPin className="h-4 w-4" />
              My Ward
            </Button>

            {/* Search */}
            <div className="relative flex-1 max-w-xs ml-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search ward..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9 rounded-full"
              />
            </div>
          </div>
        </div>

        {/* Map Container */}
        <div className="relative">
          {/* Ward Info Tooltip */}
          {hoveredWard && hoveredResult && (
            <div className="absolute top-4 left-4 z-[1000] bg-card rounded-lg shadow-lg border border-border p-4 min-w-[220px] pointer-events-none">
              <h3 className="font-heading font-bold text-lg">Ward {hoveredWard}</h3>
              <p className="text-sm text-muted-foreground mb-3">
                {hoveredResult.wardName}
              </p>
              <div className="pt-2 border-t border-border space-y-1">
                <p className="text-xs text-muted-foreground">Winner</p>
                <p className="font-medium">{hoveredResult.winner.name}</p>
                <div className="flex items-center gap-2">
                  <span 
                    className="px-2 py-0.5 rounded text-xs font-medium text-white"
                    style={{ backgroundColor: hoveredResult.winner.partyColor }}
                  >
                    {hoveredResult.winner.partyShort}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {hoveredResult.winner.votes.toLocaleString()} votes
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Interactive Map */}
          <MumbaiMap
            viewMode={viewMode}
            searchQuery={searchQuery}
            onWardHover={handleWardHover}
            onWardClick={handleWardClick}
          />

          {/* Legend for Results */}
          {viewMode === "results" && (
            <div className="absolute bottom-4 right-4 z-[1000] bg-card/95 backdrop-blur rounded-lg border border-border p-3 shadow-lg">
              <p className="text-xs font-medium text-muted-foreground mb-2">Party Colors</p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                {[
                  { party: "BJP", color: "#FF9933" },
                  { party: "SS (UBT)", color: "#FF6B00" },
                  { party: "Congress", color: "#00BFFF" },
                  { party: "MNS", color: "#FFD700" },
                  { party: "NCP", color: "#00008B" },
                  { party: "Others", color: "#808080" },
                ].map(({ party, color }) => (
                  <div key={party} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: color }} />
                    <span className="text-xs text-muted-foreground">{party}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Helper Text */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[1000] text-sm text-muted-foreground bg-background/80 backdrop-blur px-3 py-1 rounded-full border border-border">
            Hover for info • Click for details
          </div>
        </div>
      </main>
    </div>
  );
};

export default MapPage;
