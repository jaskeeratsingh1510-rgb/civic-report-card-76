import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Users, Building2, ArrowRight } from "lucide-react";

// Mumbai's 24 Administrative Wards (each containing multiple electoral wards)
const administrativeWards = [
  { code: "A", name: "Fort, Colaba", electoralWards: 10, population: "185,000" },
  { code: "B", name: "Sandhurst Road, Masjid", electoralWards: 8, population: "130,000" },
  { code: "C", name: "Marine Lines, Dhobi Talao", electoralWards: 9, population: "165,000" },
  { code: "D", name: "Grant Road, Malabar Hill", electoralWards: 10, population: "340,000" },
  { code: "E", name: "Byculla, Mazgaon", electoralWards: 11, population: "420,000" },
  { code: "F/N", name: "Matunga, Sion", electoralWards: 12, population: "520,000" },
  { code: "F/S", name: "Parel, Sewri", electoralWards: 10, population: "380,000" },
  { code: "G/N", name: "Dadar, Mahim", electoralWards: 11, population: "550,000" },
  { code: "G/S", name: "Worli, Prabhadevi", electoralWards: 8, population: "290,000" },
  { code: "H/E", name: "Bandra East, Khar", electoralWards: 9, population: "380,000" },
  { code: "H/W", name: "Bandra West", electoralWards: 7, population: "250,000" },
  { code: "K/E", name: "Andheri East, Jogeshwari", electoralWards: 12, population: "820,000" },
  { code: "K/W", name: "Andheri West, Juhu", electoralWards: 10, population: "610,000" },
  { code: "L", name: "Kurla", electoralWards: 11, population: "900,000" },
  { code: "M/E", name: "Chembur, Govandi", electoralWards: 10, population: "780,000" },
  { code: "M/W", name: "Mankhurd, Trombay", electoralWards: 8, population: "620,000" },
  { code: "N", name: "Ghatkopar", electoralWards: 11, population: "680,000" },
  { code: "P/N", name: "Malad", electoralWards: 10, population: "750,000" },
  { code: "P/S", name: "Goregaon", electoralWards: 9, population: "540,000" },
  { code: "R/C", name: "Borivali", electoralWards: 10, population: "890,000" },
  { code: "R/N", name: "Dahisar", electoralWards: 8, population: "520,000" },
  { code: "R/S", name: "Kandivali", electoralWards: 9, population: "680,000" },
  { code: "S", name: "Mulund, Bhandup", electoralWards: 11, population: "940,000" },
  { code: "T", name: "Powai, Vikhroli", electoralWards: 10, population: "720,000" },
];

const WardExplorer = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredWards = administrativeWards.filter(
    (ward) =>
      ward.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ward.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="wards" className="py-20 bg-background">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            227 Electoral Wards
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Explore Mumbai's Wards
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Mumbai is divided into 24 administrative wards, each containing multiple electoral wards.
            Find your ward and know your corporator.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search by ward name or code (e.g., Bandra, K/W)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 rounded-full text-base border-2 focus:border-accent"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-secondary rounded-xl p-5 text-center">
            <MapPin className="h-6 w-6 text-accent mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">227</p>
            <p className="text-sm text-muted-foreground">Electoral Wards</p>
          </div>
          <div className="bg-secondary rounded-xl p-5 text-center">
            <Building2 className="h-6 w-6 text-accent mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">24</p>
            <p className="text-sm text-muted-foreground">Admin Wards</p>
          </div>
          <div className="bg-secondary rounded-xl p-5 text-center">
            <Users className="h-6 w-6 text-accent mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">1.24Cr</p>
            <p className="text-sm text-muted-foreground">Population</p>
          </div>
          <div className="bg-secondary rounded-xl p-5 text-center">
            <MapPin className="h-6 w-6 text-accent mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">603</p>
            <p className="text-sm text-muted-foreground">Sq. Km Area</p>
          </div>
        </div>

        {/* Ward Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredWards.map((ward) => (
            <div key={ward.code} className="ward-card group cursor-pointer">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                    <span className="font-heading font-bold text-accent text-lg">{ward.code}</span>
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-foreground group-hover:text-accent transition-colors">
                      Ward {ward.code}
                    </h3>
                    <p className="text-sm text-muted-foreground">{ward.name}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4">
                  <span className="text-muted-foreground">
                    <span className="font-medium text-foreground">{ward.electoralWards}</span> wards
                  </span>
                  <span className="text-muted-foreground">
                    <span className="font-medium text-foreground">{ward.population}</span>
                  </span>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          ))}
        </div>

        {filteredWards.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No wards found matching "{searchQuery}"</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default WardExplorer;
