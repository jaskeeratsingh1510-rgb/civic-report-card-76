import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WardExplorer from "@/components/WardExplorer";
import CorporatorSection from "@/components/CorporatorSection";
import PromiseTracker from "@/components/PromiseTracker";
import FundDashboard from "@/components/FundDashboard";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <WardExplorer />
        <CorporatorSection />
        <PromiseTracker />
        <FundDashboard />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
