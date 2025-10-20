import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.jpg";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Menu", path: "/menu" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      role="navigation"
      aria-label="Main"
      className={`fixed top-0 left-0 right-0 z-50 w-screen max-w-[100vw] overflow-x-hidden box-border transition-all duration-300 ${
        isScrolled ? "glass glow-pink" : "bg-transparent"
      }`}
    >
      <div className="w-full max-w-[100vw] mx-auto px-4 sm:px-6 lg:px-8 overflow-x-hidden box-border">
        <div className="flex items-center justify-between h-20 w-full">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img src={logo} alt="Ravora Events Logo" className="h-12 w-12 animate-glow-pulse" />
            <span className="text-2xl font-bold text-gradient-primary">RAVORA</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-lg font-medium transition-all duration-300 hover:text-primary ${
                  location.pathname === link.path ? "text-primary text-glow-pink" : "text-foreground"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/book"
              className="px-6 py-2 bg-gradient-to-r from-primary to-accent rounded-full text-white font-semibold glow-pink hover:scale-105 transition-transform"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-foreground p-2"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden pb-4 w-full max-w-[100vw] overflow-x-hidden box-border"
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block py-3 text-lg font-medium ${location.pathname === link.path
                    ? "text-primary"
                    : "text-foreground"
                  }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/book"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block mt-4 px-6 py-3 bg-gradient-to-r from-primary to-accent rounded-full text-white font-semibold text-center"
            >
              Book Now
            </Link>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
