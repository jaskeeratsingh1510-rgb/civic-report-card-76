import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock, XCircle, AlertCircle, ArrowRight } from "lucide-react";

const promises = [
  {
    id: 1,
    title: "Build 500 new public schools in rural areas",
    candidate: "Priya Sharma",
    category: "Education",
    status: "fulfilled",
    progress: 100,
    deadline: "Dec 2024",
    lastUpdated: "3 days ago",
  },
  {
    id: 2,
    title: "Install 10,000 LED streetlights across the constituency",
    candidate: "Rajesh Kumar Singh",
    category: "Infrastructure",
    status: "in-progress",
    progress: 68,
    deadline: "Mar 2025",
    lastUpdated: "1 week ago",
  },
  {
    id: 3,
    title: "Establish 50 primary health centers",
    candidate: "Arun Patel",
    category: "Healthcare",
    status: "in-progress",
    progress: 45,
    deadline: "Jun 2025",
    lastUpdated: "2 weeks ago",
  },
  {
    id: 4,
    title: "Create 20,000 new jobs through skill development",
    candidate: "Sunita Devi",
    category: "Employment",
    status: "delayed",
    progress: 25,
    deadline: "Overdue",
    lastUpdated: "1 month ago",
  },
  {
    id: 5,
    title: "Reduce water supply disruption to zero",
    candidate: "Rajesh Kumar Singh",
    category: "Utilities",
    status: "broken",
    progress: 0,
    deadline: "Failed",
    lastUpdated: "6 months ago",
  },
];

const statusConfig = {
  fulfilled: {
    icon: CheckCircle2,
    label: "Fulfilled",
    color: "bg-success/10 text-success border-success/20",
    iconColor: "text-success",
  },
  "in-progress": {
    icon: Clock,
    label: "In Progress",
    color: "bg-accent/10 text-accent border-accent/20",
    iconColor: "text-accent",
  },
  delayed: {
    icon: AlertCircle,
    label: "Delayed",
    color: "bg-warning/10 text-warning border-warning/20",
    iconColor: "text-warning",
  },
  broken: {
    icon: XCircle,
    label: "Broken",
    color: "bg-destructive/10 text-destructive border-destructive/20",
    iconColor: "text-destructive",
  },
};

const PromiseTracker = () => {
  return (
    <section id="promises" className="py-20 bg-secondary/30">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            Promise Tracker
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Manifesto vs Reality
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real-time tracking of election promises against actual progress. 
            Hold your representatives accountable with verified data.
          </p>
        </div>

        {/* Status Legend */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {Object.entries(statusConfig).map(([key, config]) => (
            <div key={key} className="flex items-center gap-2">
              <config.icon className={`h-4 w-4 ${config.iconColor}`} />
              <span className="text-sm text-muted-foreground">{config.label}</span>
            </div>
          ))}
        </div>

        {/* Promise Cards */}
        <div className="space-y-4 max-w-4xl mx-auto mb-10">
          {promises.map((promise) => {
            const status = statusConfig[promise.status as keyof typeof statusConfig];
            const StatusIcon = status.icon;

            return (
              <div
                key={promise.id}
                className="bg-card rounded-xl p-5 shadow-card border border-border/50 hover:shadow-elevated transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  {/* Status Icon */}
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${status.color}`}>
                    <StatusIcon className="h-5 w-5" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <Badge variant="secondary" className="text-xs">
                        {promise.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        by {promise.candidate}
                      </span>
                    </div>
                    <h4 className="font-medium text-foreground mb-2">
                      {promise.title}
                    </h4>
                    
                    {/* Progress Bar */}
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            promise.status === 'fulfilled' ? 'bg-success' :
                            promise.status === 'broken' ? 'bg-destructive' :
                            promise.status === 'delayed' ? 'bg-warning' : 'bg-accent'
                          }`}
                          style={{ width: `${promise.progress}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-foreground w-12">
                        {promise.progress}%
                      </span>
                    </div>
                  </div>

                  {/* Meta */}
                  <div className="flex-shrink-0 text-right">
                    <Badge variant="outline" className={status.color}>
                      {promise.deadline}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">
                      Updated {promise.lastUpdated}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All */}
        <div className="text-center">
          <Button variant="default" size="lg" className="gap-2">
            View All Promises
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PromiseTracker;
