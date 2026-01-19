import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Trophy, Users, TrendingUp, Target, Vote, ChevronRight } from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell 
} from "recharts";
import { getPartyStats, getWardResults, candidates } from "@/data/candidates";

const ResultsPage = () => {
  const partyStats = getPartyStats();
  const wardResults = getWardResults();
  const totalSeats = 227;
  const majorityMark = 114;

  // Alliance calculations
  const mahayutiSeats = partyStats
    .filter(p => ["BJP", "SS"].includes(p.party))
    .reduce((sum, p) => sum + p.seats, 0);
  
  const mvaSeats = partyStats
    .filter(p => ["INC", "SS (UBT)", "NCP (SP)", "MNS"].includes(p.party))
    .reduce((sum, p) => sum + p.seats, 0);
  
  const otherSeats = totalSeats - mahayutiSeats - mvaSeats;

  // Top vote getters
  const topVoteGetters = [...candidates]
    .filter(c => c.isWinner)
    .sort((a, b) => b.votes - a.votes)
    .slice(0, 10);

  const leadingParty = partyStats[0];

  const pieData = partyStats.filter(p => p.seats > 0).map(p => ({
    name: p.party,
    value: p.seats,
    color: p.color,
  }));

  const barData = partyStats.filter(p => p.votes > 0).slice(0, 9).map(p => ({
    name: p.party,
    votes: p.votes,
    color: p.color,
  }));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-14">
        <div className="container py-8">
          {/* Header */}
          <div className="flex items-center gap-3 mb-2">
            <Trophy className="h-8 w-8 text-accent" />
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
              BMC Election Results 2025
            </h1>
          </div>
          <p className="text-muted-foreground mb-8">
            Live results from {totalSeats} wards declared
          </p>

          {/* Key Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="bg-[#22C55E] text-white border-0">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-1 opacity-80">
                  <Target className="h-4 w-4" />
                  <span className="text-sm">Wards Declared</span>
                </div>
                <p className="text-4xl font-bold">{totalSeats}</p>
                <p className="text-sm opacity-80">of {totalSeats} wards</p>
              </CardContent>
            </Card>

            <Card className="bg-[#06B6D4] text-white border-0">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-1 opacity-80">
                  <Users className="h-4 w-4" />
                  <span className="text-sm">Parties</span>
                </div>
                <p className="text-4xl font-bold">{partyStats.filter(p => p.seats > 0).length}</p>
                <p className="text-sm opacity-80">with winning candidates</p>
              </CardContent>
            </Card>

            <Card className="bg-[#8B5CF6] text-white border-0">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-1 opacity-80">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-sm">Leading Party</span>
                </div>
                <p className="text-4xl font-bold">{leadingParty?.party}</p>
                <p className="text-sm opacity-80">{leadingParty?.seats} seats won</p>
              </CardContent>
            </Card>

            <Card className="bg-[#EC4899] text-white border-0">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-1 opacity-80">
                  <Target className="h-4 w-4" />
                  <span className="text-sm">Majority Mark</span>
                </div>
                <p className="text-4xl font-bold">{majorityMark}</p>
                <p className="text-sm opacity-80">seats needed</p>
              </CardContent>
            </Card>
          </div>

          {/* Alliance Performance */}
          <h2 className="font-heading text-2xl font-bold mb-4">Alliance Performance</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-accent font-heading font-bold text-lg mb-1">Mahayuti</h3>
                <p className="text-sm text-muted-foreground mb-3">BJP + Shiv Sena</p>
                <p className="text-4xl font-bold text-foreground mb-2">{mahayutiSeats}<span className="text-lg font-normal text-muted-foreground ml-1">seats</span></p>
                <Progress value={(mahayutiSeats / totalSeats) * 100} className="h-2" />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="text-info font-heading font-bold text-lg mb-1">MVA</h3>
                <p className="text-sm text-muted-foreground mb-3">Congress + SS(UBT) + NCP(SP) + MNS</p>
                <p className="text-4xl font-bold text-foreground mb-2">{mvaSeats}<span className="text-lg font-normal text-muted-foreground ml-1">seats</span></p>
                <Progress value={(mvaSeats / totalSeats) * 100} className="h-2" />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-heading font-bold text-lg mb-1">Others</h3>
                <p className="text-sm text-muted-foreground mb-3">Independents & Other Parties</p>
                <p className="text-4xl font-bold text-foreground mb-2">{otherSeats}<span className="text-lg font-normal text-muted-foreground ml-1">seats</span></p>
                <Progress value={(otherSeats / totalSeats) * 100} className="h-2" />
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="font-heading">Seats Won by Party</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        dataKey="value"
                        label={({ name, value }) => `${name} ${value}`}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-heading">Total Votes by Party</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barData} layout="vertical">
                      <XAxis type="number" tickFormatter={(v) => `${(v/1000).toFixed(0)}K`} />
                      <YAxis type="category" dataKey="name" width={80} />
                      <Tooltip formatter={(value) => [value.toLocaleString(), 'Votes']} />
                      <Bar dataKey="votes" radius={[0, 4, 4, 0]}>
                        {barData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Vote Getters */}
          <h2 className="font-heading text-2xl font-bold mb-4">Top Vote Getters</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {topVoteGetters.map((candidate, index) => (
              <Link 
                key={candidate.id} 
                to={`/candidates?ward=${candidate.ward}`}
                className="bg-card rounded-xl border border-border p-4 hover:shadow-md hover:border-accent/30 transition-all group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-sm font-bold text-accent">
                    {index + 1}
                  </div>
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: candidate.partyColor }}
                  >
                    {candidate.name.charAt(0)}
                  </div>
                </div>
                <h3 className="font-medium text-sm text-foreground truncate group-hover:text-accent transition-colors">
                  {candidate.name}
                </h3>
                <p className="text-xs" style={{ color: candidate.partyColor }}>{candidate.partyShort}</p>
                <div className="flex items-center justify-between mt-2">
                  <Badge variant="secondary" className="text-xs">Ward {candidate.ward}</Badge>
                  <span className="text-sm font-bold text-accent">{candidate.votes.toLocaleString()}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResultsPage;
