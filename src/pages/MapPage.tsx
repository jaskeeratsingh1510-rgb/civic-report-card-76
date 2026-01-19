import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Search, ZoomIn, ZoomOut, Locate } from "lucide-react";
import { getWardResults } from "@/data/candidates";

const MapPage = () => {
  const [viewMode, setViewMode] = useState<"electoral" | "plain" | "results">("electoral");
  const [hoveredWard, setHoveredWard] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const wardResults = getWardResults();

  const getWardColor = (ward: number) => {
    if (viewMode === "plain") return "fill-secondary stroke-border";
    
    const result = wardResults.find(w => w.ward === ward);
    if (!result) return "fill-secondary stroke-border";

    if (viewMode === "results") {
      // Color by winning party
      const colors: Record<string, string> = {
        "BJP": "fill-[#FF9933]",
        "SS (UBT)": "fill-[#FF6B00]",
        "SS": "fill-[#FF6B00]",
        "INC": "fill-[#00BFFF]",
        "AIMIM": "fill-[#008000]",
        "MNS": "fill-[#FFD700]",
        "NCP": "fill-[#00008B]",
        "SP": "fill-[#FF0000]",
        "NCP (SP)": "fill-[#004225]",
        "IND": "fill-[#808080]",
      };
      return `${colors[result.winner.partyShort] || "fill-secondary"} stroke-background`;
    }

    return "fill-secondary hover:fill-accent/20 stroke-border cursor-pointer";
  };

  // Create a simplified ward grid representation
  const wardGrid = Array.from({ length: 227 }, (_, i) => i + 1);
  const gridCols = 15;

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
          {hoveredWard && (
            <div className="absolute top-4 left-4 z-30 bg-card rounded-lg shadow-lg border border-border p-4 min-w-[200px]">
              <h3 className="font-heading font-bold text-lg">Ward {hoveredWard}</h3>
              {wardResults.find(w => w.ward === hoveredWard) && (
                <>
                  <p className="text-sm text-muted-foreground mb-2">
                    {wardResults.find(w => w.ward === hoveredWard)?.wardName}
                  </p>
                  <div className="pt-2 border-t border-border">
                    <p className="text-xs text-muted-foreground">Winner</p>
                    <p className="font-medium">{wardResults.find(w => w.ward === hoveredWard)?.winner.name}</p>
                    <p className="text-sm" style={{ color: wardResults.find(w => w.ward === hoveredWard)?.winner.partyColor }}>
                      {wardResults.find(w => w.ward === hoveredWard)?.winner.partyShort}
                    </p>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Zoom Controls */}
          <div className="absolute bottom-4 left-4 z-30 flex flex-col gap-2">
            <Button variant="outline" size="icon" className="rounded-full bg-background">
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full bg-background">
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full bg-background">
              <Locate className="h-4 w-4" />
            </Button>
          </div>

          {/* Ward Grid Map */}
          <div className="container py-8">
            <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))` }}>
              {wardGrid.map((ward) => {
                const result = wardResults.find(w => w.ward === ward);
                const matchesSearch = searchQuery === "" || 
                  ward.toString().includes(searchQuery) ||
                  result?.wardName.toLowerCase().includes(searchQuery.toLowerCase());

                return (
                  <Link
                    key={ward}
                    to={`/candidates?ward=${ward}`}
                    className={`
                      aspect-square rounded-sm flex items-center justify-center text-xs font-medium
                      transition-all duration-200 border
                      ${matchesSearch ? '' : 'opacity-30'}
                      ${hoveredWard === ward ? 'ring-2 ring-accent ring-offset-2' : ''}
                      ${viewMode === "results" && result
                        ? `text-white`
                        : 'text-muted-foreground hover:text-foreground'
                      }
                    `}
                    style={{
                      backgroundColor: viewMode === "results" && result 
                        ? result.winner.partyColor 
                        : viewMode === "electoral" 
                          ? 'hsl(var(--secondary))'
                          : 'transparent',
                      borderColor: 'hsl(var(--border))',
                    }}
                    onMouseEnter={() => setHoveredWard(ward)}
                    onMouseLeave={() => setHoveredWard(null)}
                  >
                    {ward}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Legend for Results */}
          {viewMode === "results" && (
            <div className="container pb-8">
              <div className="flex flex-wrap justify-center gap-4 p-4 bg-card rounded-lg border border-border">
                {[
                  { party: "BJP", color: "#FF9933" },
                  { party: "SS (UBT)", color: "#FF6B00" },
                  { party: "Shiv Sena", color: "#FF6B00" },
                  { party: "Congress", color: "#00BFFF" },
                  { party: "MNS", color: "#FFD700" },
                  { party: "Others", color: "#808080" },
                ].map(({ party, color }) => (
                  <div key={party} className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: color }} />
                    <span className="text-sm text-muted-foreground">{party}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Helper Text */}
          <div className="fixed bottom-4 right-4 text-sm text-muted-foreground">
            Hover for info • Click for details
          </div>
        </div>
      </main>
    </div>
  );
};

export default MapPage;
