// Party data
export const parties = [
  { name: "Bharatiya Janata Party", short: "BJP", color: "#FF9933", seats: 89 },
  { name: "Shiv Sena (UBT)", short: "SS (UBT)", color: "#FF6B00", seats: 65 },
  { name: "Shiv Sena", short: "SS", color: "#FF6B00", seats: 29 },
  { name: "Indian National Congress", short: "INC", color: "#00BFFF", seats: 24 },
  { name: "All India Majlis-E-Ittehadul Muslimeen", short: "AIMIM", color: "#008000", seats: 8 },
  { name: "Maharashtra Navnirman Sena", short: "MNS", color: "#FFD700", seats: 6 },
  { name: "Nationalist Congress Party", short: "NCP", color: "#00008B", seats: 3 },
  { name: "Samajwadi Party", short: "SP", color: "#FF0000", seats: 2 },
  { name: "NCP (Sharadchandra Pawar)", short: "NCP (SP)", color: "#004225", seats: 1 },
  { name: "Independent", short: "IND", color: "#808080", seats: 0 },
];

// Generate sample candidates for all 227 wards
const wardAreas = {
  1: "Dahisar East", 2: "Dahisar West", 3: "Borivali East", 4: "Borivali West",
  5: "Kandivali East", 6: "Kandivali West", 7: "Malad East", 8: "Malad West",
  9: "Goregaon East", 10: "Goregaon West", 11: "Jogeshwari East", 12: "Jogeshwari West",
  13: "Andheri East", 14: "Andheri West", 15: "Vile Parle East", 16: "Vile Parle West",
  17: "Santacruz East", 18: "Santacruz West", 19: "Khar West", 20: "Bandra East",
  21: "Bandra West", 22: "Mahim", 23: "Dadar East", 24: "Dadar West",
  25: "Parel", 26: "Worli", 27: "Lower Parel", 28: "Mahalaxmi",
  29: "Tardeo", 30: "Mumbai Central", 31: "Grant Road", 32: "Marine Lines",
  33: "Churchgate", 34: "Fort", 35: "Colaba", 36: "Cuffe Parade",
  // Continue for more wards...
};

const getWardName = (ward) => {
  return wardAreas[ward] || `Area ${ward}`;
};

const categories = ["General", "OBC (W)", "SC", "ST", "OBC", "GEN (W)"];

const firstNames = ["Rekha", "Vishwanath", "Priya", "Anil", "Sunita", "Sameer", "Rakhee", "Dhanshree", "Tejasvi", "Pradip", "Forum", "Bhavika", "Sheetal", "Singh", "Jignasa", "Dhaval"];
const lastNames = ["Yadav", "Mahadeshwar", "Sharma", "Patil", "Desai", "Jadhav", "Kolge", "Ghosalkar", "Choubey", "Parmar", "Gavkar", "Mhatre", "Girish", "Shah", "Vora", "Kumar"];

function generateCandidates() {
  const candidates = [];
  let id = 1;

  for (let ward = 1; ward <= 227; ward++) {
    const numCandidates = Math.floor(Math.random() * 5) + 4; // 4-8 candidates per ward
    const wardCandidates = [];
    
    for (let i = 0; i < numCandidates; i++) {
      const party = parties[Math.floor(Math.random() * parties.length)];
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      
      wardCandidates.push({
        id: `candidate-${id++}`,
        name: `${firstName} ${lastName}`,
        party: party.name,
        partyShort: party.short,
        partyColor: party.color,
        ward,
        wardName: getWardName(ward),
        category: categories[Math.floor(Math.random() * categories.length)],
        votes: Math.floor(Math.random() * 20000) + 500,
        isWinner: false,
      });
    }

    // Sort by votes and mark winner
    wardCandidates.sort((a, b) => b.votes - a.votes);
    wardCandidates[0].isWinner = true;
    
    candidates.push(...wardCandidates);
  }

  return candidates;
}

export const candidates = generateCandidates();

export const getWardResults = () => {
  const wardMap = new Map();
  
  candidates.forEach(c => {
    if (!wardMap.has(c.ward)) {
      wardMap.set(c.ward, []);
    }
    wardMap.get(c.ward).push(c);
  });

  const results = [];
  wardMap.forEach((wardCandidates, ward) => {
    const sorted = [...wardCandidates].sort((a, b) => b.votes - a.votes);
    results.push({
      ward,
      wardName: getWardName(ward),
      winner: sorted[0],
      totalVotes: sorted.reduce((sum, c) => sum + c.votes, 0),
      candidates: sorted,
    });
  });

  return results.sort((a, b) => a.ward - b.ward);
};

export const getPartyStats = () => {
  const stats = new Map();
  
  parties.forEach(p => {
    stats.set(p.short, { seats: 0, votes: 0, color: p.color });
  });

  candidates.forEach(c => {
    const stat = stats.get(c.partyShort);
    if (stat) {
      stat.votes += c.votes;
      if (c.isWinner) stat.seats += 1;
    }
  });

  return Array.from(stats.entries())
    .map(([party, data]) => ({ party, ...data }))
    .sort((a, b) => b.seats - a.seats);
};
