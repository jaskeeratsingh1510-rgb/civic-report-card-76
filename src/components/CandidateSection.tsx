import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CandidateCard from "./CandidateCard";
import { Search, Filter, ArrowRight } from "lucide-react";

const candidates = [
  {
    name: "Rajesh Kumar Singh",
    party: "Democratic Alliance",
    partyColor: "#0ea5e9",
    constituency: "Mumbai North West",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    promisesFulfilled: 18,
    totalPromises: 25,
    termStart: "2019",
    rating: 8.2,
  },
  {
    name: "Priya Sharma",
    party: "People's Progressive Party",
    partyColor: "#22c55e",
    constituency: "Delhi South",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
    promisesFulfilled: 22,
    totalPromises: 28,
    termStart: "2020",
    rating: 8.7,
  },
  {
    name: "Arun Patel",
    party: "National Unity Front",
    partyColor: "#f97316",
    constituency: "Ahmedabad East",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
    promisesFulfilled: 12,
    totalPromises: 20,
    termStart: "2021",
    rating: 7.5,
  },
  {
    name: "Sunita Devi",
    party: "Citizens First",
    partyColor: "#8b5cf6",
    constituency: "Lucknow Central",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
    promisesFulfilled: 15,
    totalPromises: 22,
    termStart: "2019",
    rating: 7.8,
  },
];

const CandidateSection = () => {
  return (
    <section id="candidates" className="py-20 bg-background">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            Candidate Profiles
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Unified Digital Report Cards
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Access comprehensive profiles of election candidates with verified information, 
            performance metrics, and real-time promise tracking.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto mb-12">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search by name, constituency, or party..."
              className="pl-10 h-12 rounded-xl"
            />
          </div>
          <Button variant="outline" size="lg" className="gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>

        {/* Candidate Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {candidates.map((candidate) => (
            <CandidateCard key={candidate.name} {...candidate} />
          ))}
        </div>

        {/* View All */}
        <div className="text-center">
          <Button variant="default" size="lg" className="gap-2">
            Browse All Candidates
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CandidateSection;
