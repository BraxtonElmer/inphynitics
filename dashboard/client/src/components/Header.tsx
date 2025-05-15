import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { InfiniteLogo } from "./ui/infinite-logo";
import { Button } from "@/components/ui/button";
import LogoImage from "../assets/logo.png";
import { Menu, X, ChevronDown } from "lucide-react"; // Import icons

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 py-4 transition-colors duration-300 ${
          scrolled || mobileMenuOpen ? "bg-black/80 backdrop-blur-sm" : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <a href="#" className="flex items-center z-10">
            <img src={LogoImage} alt="Inphynitics Logo" className="w-full h-12" />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <div className="bg-darkGray rounded-full px-8 py-3">
              <ul className="flex space-x-8">
                <li>
                  <a href="#" className="text-white hover:text-primary transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white hover:text-primary transition-colors">
                    Incare
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white hover:text-primary transition-colors">
                    Discover
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white hover:text-primary transition-colors">
                    Connect
                  </a>
                </li>
              </ul>
            </div>
          </nav>

          {/* Mobile menu toggle button */}
          <div className="flex items-center gap-2 z-10">
            <Button
              asChild
              variant="default"
              className="bg-primary hover:bg-secondary text-black font-semibold rounded-full px-6 py-2 transition-colors"
            >
              <a href="#signup">Sign Up</a>
            </Button>
            
            <button 
              onClick={toggleMobileMenu} 
              className="md:hidden p-2 text-white focus:outline-none"
            >
              {mobileMenuOpen ? (
                <X className="h-7 w-7" />
              ) : (
                <Menu className="h-7 w-7" />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Navigation Menu - Slides from top */}
      <motion.div 
        className={`fixed inset-0 z-40 bg-black/95 pt-24 px-4 md:hidden overflow-y-auto`}
        initial={{ y: "-100%" }}
        animate={{ y: mobileMenuOpen ? "0%" : "-100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <nav className="container mx-auto">
          <ul className="flex flex-col space-y-4 text-center py-8">
            <li className="py-4 border-b border-gray-800">
              <a href="#" className="text-white text-xl font-medium hover:text-primary transition-colors flex items-center justify-center">
                Home
              </a>
            </li>
            <li className="py-4 border-b border-gray-800">
              <a href="#" className="text-white text-xl font-medium hover:text-primary transition-colors flex items-center justify-center">
                Incare
              </a>
            </li>
            <li className="py-4 border-b border-gray-800">
              <a href="#" className="text-white text-xl font-medium hover:text-primary transition-colors flex items-center justify-center">
                Discover
              </a>
            </li>
            <li className="py-4 border-b border-gray-800">
              <a href="#" className="text-white text-xl font-medium hover:text-primary transition-colors flex items-center justify-center">
                Connect
              </a>
            </li>
          </ul>
        </nav>
      </motion.div>
    </>
  );
}
