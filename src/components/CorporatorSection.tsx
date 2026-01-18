import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Search, Filter, MapPin, Star, ArrowRight } from "lucide-react";
import { useState } from "react";

const corporators = [
  {
    name: "Vishwanath Mahadeshwar",
    party: "Shiv Sena (UBT)",
    partyColor: "#FF6B00",
    ward: "Ward 227",
    area: "Byculla",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    promisesFulfilled: 18,
    totalPromises: 25,
    rating: 8.2,
  },
  {
    name: "Rakhee Jadhav",
    party: "NCP",
    partyColor: "#00BFFF",
    ward: "Ward 198",
    area: "Andheri East",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
    promisesFulfilled: 22,
    totalPromises: 28,
    rating: 8.7,
  },
  {
    name: "Sameer Desai",
    party: "BJP",
    partyColor: "#FF9933",
    ward: "Ward 156",
    area: "Borivali",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
    promisesFulfilled: 12,
    totalPromises: 20,
    rating: 7.5,
  },
  {
    name: "Priya Sharma",
    party: "INC",
    partyColor: "#00BFFF",
    ward: "Ward 089",
    area: "Worli",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
    promisesFulfilled: 15,
    totalPromises: 22,
    rating: 7.8,
  },
  {
    name: "Anil Patil",
    party: "MNS",
    partyColor: "#FFD700",
    ward: "Ward 142",
    area: "Dadar",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",
    promisesFulfilled: 20,
    totalPromises: 24,
    rating: 8.5,
  },
  {
    name: "Sunita Yadav",
    party: "Shiv Sena",
    partyColor: "#FF6B00",
    ward: "Ward 201",
    area: "Malad",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop&crop=face",
    promisesFulfilled: 16,
    totalPromises: 20,
    rating: 8.0,
  },
];

const CorporatorSection = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCorporators = corporators.filter(
    (corp) =>
      corp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      corp.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
      corp.party.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="corporators" className="py-20 bg-secondary/50">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            Your Representatives
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Know Your Corporators
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Access comprehensive profiles with verified information, performance metrics, 
            and real-time promise tracking for Mumbai's elected representatives.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto mb-12">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search by name, area, or party..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 rounded-full"
            />
          </div>
          <Button variant="outline" size="lg" className="gap-2 rounded-full">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>

        {/* Corporator Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {filteredCorporators.map((corporator) => {
            const fulfillmentRate = Math.round((corporator.promisesFulfilled / corporator.totalPromises) * 100);
            
            return (
              <div 
                key={corporator.name} 
                className="bg-card rounded-xl border border-border p-6 hover:shadow-lg hover:border-accent/30 transition-all duration-300 group"
              >
                {/* Header */}
                <div className="flex items-start gap-4 mb-5">
                  <div className="relative">
                    <img
                      src={corporator.image}
                      alt={corporator.name}
                      className="w-16 h-16 rounded-xl object-cover"
                    />
                    <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-accent flex items-center justify-center text-xs font-bold text-accent-foreground">
                      {corporator.rating}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading text-lg font-bold text-foreground truncate group-hover:text-accent transition-colors">
                      {corporator.name}
                    </h3>
                    <Badge 
                      variant="secondary" 
                      className="mt-1 font-medium"
                      style={{ backgroundColor: `${corporator.partyColor}20`, color: corporator.partyColor }}
                    >
                      {corporator.party}
                    </Badge>
                  </div>
                </div>

                {/* Ward Info */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-5">
                  <MapPin className="h-4 w-4" />
                  <span>{corporator.ward} • {corporator.area}</span>
                </div>

                {/* Promise Progress */}
                <div className="mb-5">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="font-medium text-foreground">Promise Fulfillment</span>
                    <span className="font-bold text-accent">{fulfillmentRate}%</span>
                  </div>
                  <Progress value={fulfillmentRate} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1.5">
                    {corporator.promisesFulfilled} of {corporator.totalPromises} promises fulfilled
                  </p>
                </div>

                {/* Action */}
                <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all rounded-full">
                  View Full Profile
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            );
          })}
        </div>

        {/* View All */}
        <div className="text-center">
          <Button size="lg" className="gap-2 rounded-full">
            Browse All 227 Corporators
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CorporatorSection;
