import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CandidateSection from "@/components/CandidateSection";
import PromiseTracker from "@/components/PromiseTracker";
import FundDashboard from "@/components/FundDashboard";
import PublicFeedback from "@/components/PublicFeedback";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <CandidateSection />
        <PromiseTracker />
        <FundDashboard />
        <PublicFeedback />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
