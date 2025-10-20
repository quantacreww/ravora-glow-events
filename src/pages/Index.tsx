import { motion } from "framer-motion";
import { pageTransition } from "@/lib/motion";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import AboutSection from "@/components/AboutSection";
import CategoriesSection from "@/components/CategoriesSection";
import EventsSection from "@/components/EventsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <motion.div {...pageTransition} className="w-full max-w-[100vw] overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <CategoriesSection />
      <EventsSection />
      <HowItWorks />
      <ContactSection />
      <Footer />
    </motion.div>
  );
};

export default Index;
