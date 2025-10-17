import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { fadeIn } from "@/lib/motion";
import { Music, Users, Sparkles } from "lucide-react";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      icon: Music,
      title: "Premium Music",
      description: "Top DJs spinning the hottest tracks all night",
    },
    {
      icon: Users,
      title: "Vibrant Crowd",
      description: "Meet like-minded party lovers in an energetic atmosphere",
    },
    {
      icon: Sparkles,
      title: "Unforgettable Vibes",
      description: "Neon lights, great drinks, and memories that last",
    },
  ];

  return (
    <section id="about" ref={ref} className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient-primary">About</span> Ravora Events
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're Hyderabad's premier nightlife brand, hosting electrifying weekend parties 
            at the city's hottest pubs. From pulse-pounding beats to dazzling neon lights, 
            we create experiences that turn ordinary nights into extraordinary memories.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="glass p-8 rounded-2xl hover:glow-pink transition-all duration-300 group"
            >
              <div className="mb-6 inline-block p-4 bg-gradient-to-r from-primary to-accent rounded-2xl glow-pink">
                <feature.icon size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gradient-primary">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
