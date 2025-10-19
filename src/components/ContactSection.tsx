import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Instagram, MessageCircle } from "lucide-react";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="book-now" ref={ref} className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient-primary">Join</span> The Party
          </h2>
          <p className="text-xl text-muted-foreground mb-12">
            Connect with us on social media or book your spot now
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
            <motion.a
              href="https://instagram.com/ravora_events"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full text-white font-semibold glow-pink"
            >
              <Instagram size={24} />
              <span>Follow on Instagram</span>
            </motion.a>

            <motion.a
              href="https://wa.me/+919618414997"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-green-500 to-teal-500 rounded-full text-white font-semibold glow-blue"
            >
              <MessageCircle size={24} />
              <span>WhatsApp Us</span>
            </motion.a>
          </div>

          <motion.a
            href="/book"
            whileHover={{ scale: 1.05 }}
            className="px-12 py-5 bg-gradient-to-r from-primary to-accent rounded-full text-white font-bold text-xl glow-pink inline-flex items-center justify-center"
          >
            🎉 Book Your Spot Now 🎉
          </motion.a>
        </motion.div>
      </div>

    </section>
  );
};

export default ContactSection;
