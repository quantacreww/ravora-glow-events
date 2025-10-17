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
    <motion.div {...pageTransition}>
      <Navbar />
      <HeroSection />
  <HowItWorks />
      <AboutSection />
  <CategoriesSection />
      <EventsSection />
      <ContactSection />
      <Footer />
    </motion.div>
  );
};

export default Index;
