import { motion } from "framer-motion";
import { pageTransition } from "@/lib/motion";
import { menuData } from "@/lib/menu-data";
import MenuCard from "@/components/MenuCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Menu = () => {
  return (
    <motion.div {...pageTransition}>
      <Navbar />
      
      <main className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-gradient-primary">Our Menu</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Make this in a pub vibe in an Attractive way... with some emojis like 
              alcohol 🍸 and non alcohol 🧃 stuff with different pictures, 
              so that you can grab them easily.
            </p>
          </motion.div>

          {menuData.map((category) => (
            <div key={category.id} className="mb-20">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >
                <h2 className="text-4xl font-bold mb-4">
                  <span className="text-gradient-primary">{category.emoji} {category.category}</span>
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.items.map((item, index) => (
                  <MenuCard key={item.id} item={item} index={index} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </motion.div>
  );
};

export default Menu;
