import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { TrendingUp, IndianRupee, ArrowRight, Building2 } from "lucide-react";

const allocationData = [
  { name: "Infrastructure", value: 35, color: "hsl(175, 70%, 35%)" },
  { name: "Education", value: 22, color: "hsl(220, 60%, 50%)" },
  { name: "Healthcare", value: 18, color: "hsl(160, 70%, 40%)" },
  { name: "Welfare", value: 15, color: "hsl(38, 92%, 50%)" },
  { name: "Others", value: 10, color: "hsl(215, 20%, 65%)" },
];

const utilizationData = [
  { constituency: "Mumbai NW", allocated: 450, utilized: 380 },
  { constituency: "Delhi South", allocated: 520, utilized: 495 },
  { constituency: "Ahmedabad E", allocated: 380, utilized: 290 },
  { constituency: "Lucknow C", allocated: 410, utilized: 365 },
];

const FundDashboard = () => {
  return (
    <section id="funds" className="py-20 bg-background">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            Fund Dashboard
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Follow the Money
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Constituency-level fund allocation and utilization data visualized 
            for complete financial transparency.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-card rounded-xl p-6 shadow-card border border-border/50">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <IndianRupee className="h-5 w-5 text-accent" />
              </div>
              <span className="text-sm text-muted-foreground">Total Allocated</span>
            </div>
            <p className="text-3xl font-bold text-foreground">₹1,760 Cr</p>
            <p className="text-sm text-success mt-1">+12% from last year</p>
          </div>

          <div className="bg-card rounded-xl p-6 shadow-card border border-border/50">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-success" />
              </div>
              <span className="text-sm text-muted-foreground">Total Utilized</span>
            </div>
            <p className="text-3xl font-bold text-foreground">₹1,530 Cr</p>
            <p className="text-sm text-muted-foreground mt-1">87% utilization rate</p>
          </div>

          <div className="bg-card rounded-xl p-6 shadow-card border border-border/50">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Building2 className="h-5 w-5 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">Projects Funded</span>
            </div>
            <p className="text-3xl font-bold text-foreground">3,847</p>
            <p className="text-sm text-muted-foreground mt-1">Across 543 constituencies</p>
          </div>

          <div className="bg-card rounded-xl p-6 shadow-card border border-border/50">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                <IndianRupee className="h-5 w-5 text-warning" />
              </div>
              <span className="text-sm text-muted-foreground">Pending Funds</span>
            </div>
            <p className="text-3xl font-bold text-foreground">₹230 Cr</p>
            <p className="text-sm text-warning mt-1">Awaiting disbursement</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          {/* Allocation Pie Chart */}
          <div className="bg-card rounded-2xl p-6 shadow-card border border-border/50">
            <h3 className="font-heading text-xl font-bold text-foreground mb-6">
              Fund Allocation by Sector
            </h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={allocationData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {allocationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [`${value}%`, 'Allocation']}
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Utilization Bar Chart */}
          <div className="bg-card rounded-2xl p-6 shadow-card border border-border/50">
            <h3 className="font-heading text-xl font-bold text-foreground mb-6">
              Allocation vs Utilization (₹ Crores)
            </h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={utilizationData} barGap={8}>
                  <XAxis
                    dataKey="constituency"
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Legend />
                  <Bar dataKey="allocated" name="Allocated" fill="hsl(220, 60%, 50%)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="utilized" name="Utilized" fill="hsl(175, 70%, 35%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* View All */}
        <div className="text-center">
          <Button variant="default" size="lg" className="gap-2">
            Explore Full Dashboard
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FundDashboard;
