import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";

function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-emerald-950 text-white">
      <Navbar />
      <HeroSection />
    </main>
  );
}

export default HomePage;
