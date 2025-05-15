import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { WaveBackground } from "./ui/wave-background";

export function Hero() {
  const waveRef = useRef<HTMLDivElement>(null);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <section
      id="hero"
      className="min-h-screen relative flex items-center pt-20 overflow-hidden"
    >
      <WaveBackground ref={waveRef} />
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          <motion.h1
            variants={item}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4"
          >
            PHYSICS MADE <span className="text-primary">SIMPLE</span>
          </motion.h1>
          
          <motion.p
            variants={item}
            className="text-lg md:text-xl max-w-2xl mx-auto mb-12 text-gray-300"
          >
            Welcome to a space where physics becomes simple, fun, and easy to grasp.
          </motion.p>
          
          <motion.div 
            variants={item}
            className="flex flex-col md:flex-row justify-center gap-4"
          >
            <Button 
              asChild
              variant="custom"
              className="bg-primary hover:bg-secondary text-black font-semibold rounded-full px-10 py-3 transition-colors"
            >
              <a href="#">ENROLL NOW</a>
            </Button>
            
            <Button
              asChild
              variant="outline"
              className="border border-gray-600 hover:border-primary text-white font-semibold rounded-full px-10 py-3 transition-colors"
            >
              <a href="#roadmap">LEARN MORE</a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
