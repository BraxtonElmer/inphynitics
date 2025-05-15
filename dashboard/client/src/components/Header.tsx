import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { InfiniteLogo } from "./ui/infinite-logo";
import { Button } from "@/components/ui/button";
import LogoImage from "../assets/logo.png";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

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

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 py-4 transition-colors duration-300 ${
        scrolled ? "bg-black/80 backdrop-blur-sm" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a href="#" className="flex items-center">
          <img src={LogoImage} alt="Inphynitics Logo" className="w-full h-12" />
        </a>

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

        <Button
          asChild
          variant="custom"
          className="bg-primary hover:bg-secondary text-black font-semibold rounded-full px-6 py-2 transition-colors"
        >
          <a href="#signup">Sign Up</a>
        </Button>
      </div>
    </motion.header>
  );
}
