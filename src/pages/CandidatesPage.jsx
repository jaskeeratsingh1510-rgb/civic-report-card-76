import { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, MapPin, Vote, ChevronLeft, ChevronRight, Trophy } from "lucide-react";
import { candidates, parties } from "@/data/candidates";

const ITEMS_PER_PAGE = 20;

const CandidatesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedParty, setSelectedParty] = useState("all");
  const [selectedWard, setSelectedWard] = useState(searchParams.get("ward") || "all");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredCandidates = useMemo(() => {
    return candidates.filter((c) => {
      const matchesSearch = searchQuery === "" ||
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.party.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesParty = selectedParty === "all" || c.partyShort === selectedParty;
      const matchesWard = selectedWard === "all" || c.ward.toString() === selectedWard;

      return matchesSearch && matchesParty && matchesWard;
    });
  }, [searchQuery, selectedParty, selectedWard]);

  const totalPages = Math.ceil(filteredCandidates.length / ITEMS_PER_PAGE);
  const paginatedCandidates = filteredCandidates.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const uniqueWards = Array.from(new Set(candidates.map(c => c.ward))).sort((a, b) => a - b);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-14">
        <div className="container py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">
              BMC Election Candidates 2025
            </h1>
            <p className="text-muted-foreground">
              Browse all {candidates.length.toLocaleString()} candidates standing for the BMC elections
            </p>
          </div>

          {/* CTA Banner */}
          <div className="bg-secondary rounded-xl p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                <MapPin className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h3 className="font-heading font-semibold">Find your ward on the map</h3>
                <p className="text-sm text-muted-foreground">See all candidates in your area and compare them</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Link to="/map">
                <Button className="rounded-full">Explore Map</Button>
              </Link>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search by candidate name or party..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-10 h-11"
              />
            </div>
            <Select value={selectedParty} onValueChange={(v) => { setSelectedParty(v); setCurrentPage(1); }}>
              <SelectTrigger className="w-full md:w-[200px] h-11">
                <SelectValue placeholder="Select Party..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Parties</SelectItem>
                {parties.map((p) => (
                  <SelectItem key={p.short} value={p.short}>{p.short}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedWard} onValueChange={(v) => { setSelectedWard(v); setCurrentPage(1); }}>
              <SelectTrigger className="w-full md:w-[150px] h-11">
                <SelectValue placeholder="Select Ward..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Wards</SelectItem>
                {uniqueWards.map((w) => (
                  <SelectItem key={w} value={w.toString()}>Ward {w}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">
              Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1}-{Math.min(currentPage * ITEMS_PER_PAGE, filteredCandidates.length)} of {filteredCandidates.length.toLocaleString()} candidates
            </p>
            <p className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </p>
          </div>

          {/* Candidate Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {paginatedCandidates.map((candidate) => (
              <CandidateCard key={candidate.id} candidate={candidate} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    size="icon"
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum}
                  </Button>
                );
              })}
              
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

const CandidateCard = ({ candidate }) => {
  return (
    <div className={`relative bg-card rounded-xl border p-5 hover:shadow-md transition-all ${candidate.isWinner ? 'border-accent' : 'border-border'}`}>
      {/* Winner Badge */}
      {candidate.isWinner && (
        <div className="absolute top-3 right-3">
          <Badge className="bg-accent text-accent-foreground gap-1">
            <Trophy className="h-3 w-3" />
            WINNER
          </Badge>
        </div>
      )}

      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        <div 
          className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
          style={{ backgroundColor: candidate.partyColor }}
        >
          {candidate.name.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-heading font-bold text-foreground truncate">{candidate.name}</h3>
          <p className="text-sm" style={{ color: candidate.partyColor }}>{candidate.party}</p>
        </div>
      </div>

      {/* Votes */}
      <div className="flex items-center gap-2 mb-4">
        <Vote className="h-4 w-4 text-muted-foreground" />
        <span className="font-medium text-accent">{candidate.votes.toLocaleString()}</span>
        <span className="text-sm text-muted-foreground">votes</span>
      </div>

      {/* Ward Info */}
      <div className="flex items-center justify-between">
        <Badge variant="secondary" className="font-medium">
          Ward {candidate.ward}
        </Badge>
        <Badge variant="outline" className="text-xs">
          {candidate.category}
        </Badge>
      </div>

      {/* Compare Link */}
      <Link 
        to={`/candidates?ward=${candidate.ward}`}
        className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors pt-4 border-t border-border"
      >
        <MapPin className="h-4 w-4" />
        Compare Ward
      </Link>
    </div>
  );
};

export default CandidatesPage;
