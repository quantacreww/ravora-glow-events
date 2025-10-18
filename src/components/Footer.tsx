import { Instagram, MessageCircle, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-gradient-primary mb-4">RAVORA EVENTS</h3>
            <p className="text-muted-foreground">
              Hyderabad's premier nightlife destination. Creating unforgettable weekend experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/#about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="/#events" className="text-muted-foreground hover:text-primary transition-colors">
                  Events
                </a>
              </li>
              <li>
                <a href="/menu" className="text-muted-foreground hover:text-primary transition-colors">
                  Menu
                </a>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Policies</h4>
            <ul className="space-y-2">
              <li><a href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="text-muted-foreground hover:text-primary transition-colors">Terms & Conditions</a></li>
              <li><a href="/refunds" className="text-muted-foreground hover:text-primary transition-colors">Cancellation & Refunds</a></li>
              <li><a href="/shipping" className="text-muted-foreground hover:text-primary transition-colors">Shipping & Delivery</a></li>
              <li><a href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
            <div className="flex space-x-4 mb-4">
              <motion.a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="p-3 rounded-full bg-gradient-to-r from-primary to-accent glow-pink"
              >
                <Instagram size={24} />
              </motion.a>
              <motion.a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="p-3 rounded-full bg-gradient-to-r from-secondary to-primary glow-blue"
              >
                <MessageCircle size={24} />
              </motion.a>
            </div>
            <div className="flex items-start space-x-2 text-muted-foreground">
              <MapPin size={20} className="mt-1 flex-shrink-0" />
              <span>Hyderabad, Telangana, India</span>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center text-muted-foreground">
          <p>&copy; {currentYear} Ravora Events. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
