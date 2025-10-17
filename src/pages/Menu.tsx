import { motion } from "framer-motion";
import { pageTransition } from "@/lib/motion";
import PackageOptions from "@/components/PackageOptions";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Menu = () => {
  return (
    <motion.div {...pageTransition}>
      <Navbar />
      
      <main className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-6"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gradient-primary">Package Options</h1>
            <p className="text-muted-foreground mt-2">Premium nightlife packages curated for your crew</p>
          </motion.div>
          <PackageOptions />
        </div>
      </main>

      <Footer />
    </motion.div>
  );
};

export default Menu;
