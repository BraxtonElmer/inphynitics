import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Roadmap } from "@/components/Roadmap";
import { OrbitalText } from "@/components/OrbitalText";
import { StudentExperience } from "@/components/StudentExperience";
import { Testimonials } from "@/components/Testimonials";
import { Registration } from "@/components/Registration";
import { Footer } from "@/components/Footer";
import { useScrollToTop } from "@/lib/hooks";

export default function Home() {
  useScrollToTop();
  
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <Roadmap />
        <OrbitalText />
        <StudentExperience />
        <Testimonials />
        <Registration />
      </main>
      <Footer />
    </div>
  );
}
