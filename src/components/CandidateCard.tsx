import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { MapPin, Calendar, ExternalLink } from "lucide-react";

interface CandidateCardProps {
  name: string;
  party: string;
  partyColor: string;
  constituency: string;
  image: string;
  promisesFulfilled: number;
  totalPromises: number;
  termStart: string;
  rating: number;
}

const CandidateCard = ({
  name,
  party,
  partyColor,
  constituency,
  image,
  promisesFulfilled,
  totalPromises,
  termStart,
  rating,
}: CandidateCardProps) => {
  const fulfillmentRate = Math.round((promisesFulfilled / totalPromises) * 100);

  return (
    <div className="group relative bg-card rounded-2xl shadow-card hover:shadow-elevated transition-all duration-300 overflow-hidden border border-border/50">
      {/* Party Color Accent */}
      <div 
        className="absolute top-0 left-0 right-0 h-1"
        style={{ backgroundColor: partyColor }}
      />

      <div className="p-6">
        {/* Header */}
        <div className="flex items-start gap-4 mb-5">
          <div className="relative">
            <img
              src={image}
              alt={name}
              className="w-16 h-16 rounded-xl object-cover shadow-md"
            />
            <div 
              className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-card flex items-center justify-center text-[10px] font-bold text-primary-foreground"
              style={{ backgroundColor: partyColor }}
            >
              {rating}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-heading text-lg font-bold text-foreground truncate group-hover:text-accent transition-colors">
              {name}
            </h3>
            <Badge 
              variant="secondary" 
              className="mt-1 font-medium"
              style={{ backgroundColor: `${partyColor}20`, color: partyColor }}
            >
              {party}
            </Badge>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-2 mb-5">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{constituency}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>In office since {termStart}</span>
          </div>
        </div>

        {/* Promise Progress */}
        <div className="mb-5">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="font-medium text-foreground">Promise Fulfillment</span>
            <span className="font-bold text-accent">{fulfillmentRate}%</span>
          </div>
          <Progress value={fulfillmentRate} className="h-2" />
          <p className="text-xs text-muted-foreground mt-1.5">
            {promisesFulfilled} of {totalPromises} promises fulfilled
          </p>
        </div>

        {/* Action */}
        <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all">
          View Full Profile
          <ExternalLink className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default CandidateCard;
