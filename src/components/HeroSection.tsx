import { motion } from "framer-motion";
import { fadeIn, fadeInScale } from "@/lib/motion";
import heroImage from "@/assets/hero-fallback.jpg";
import logo from "@/assets/logo.jpg";

const HeroSection = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.img
          src={logo}
          alt="Ravora Logo"
          className="w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64 mx-auto mb-8 animate-float"
          {...fadeInScale}
          transition={{ duration: 0.8 }}
        />

        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6"
          {...fadeIn}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <span className="text-gradient-primary text-glow-pink">RAVORA</span>
          <br />
          <span className="text-foreground">EVENTS</span>
        </motion.h1>

        <motion.p
          className="text-xl sm:text-2xl md:text-3xl text-muted-foreground mb-8"
          {...fadeIn}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Where Nights Come Alive
        </motion.p>

        <motion.div
          className="inline-block"
          {...fadeInScale}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <span className="px-6 py-3 bg-gradient-to-r from-accent to-secondary rounded-full text-white font-semibold text-lg glow-purple inline-block animate-glow-pulse">
            🎉 Coming Soon 🎉
          </span>
        </motion.div>

        <motion.div
          className="mt-12"
          {...fadeIn}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <a
            href="#events"
            className="inline-flex items-center justify-center h-12 px-8 bg-gradient-to-r from-primary to-accent rounded-full text-white font-semibold text-base glow-pink animate-glow-pulse hover:scale-105 transition-transform"
          >
            Explore Events
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-primary rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-primary rounded-full animate-pulse"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
