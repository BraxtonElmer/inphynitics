import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "./ui/section-wrapper";
import jessicaImage from "../assets/jessica.png";
import darleneImage from "../assets/darlene.png";
import dianneImage from "../assets/dianne.png";

type Testimonial = {
  name: string;
  avatar: string;
  content: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Jassica Andrew",
    avatar: jessicaImage,
    content: "My child has improved a lot after finishing school. Thank you very much Inphynitics.",
  },
  {
    name: "Darlene Robertson",
    avatar: darleneImage,
    content: "My child knows how to write very good essays. English ability is also much better. The cost is very cheap, so you should register. Thank you very much Inphynitics.",
  },
  {
    name: "Dianne Russell",
    avatar: dianneImage,
    content: "My child has improved a lot after finishing school. Thank you very much Inphynitics.",
  },
];

export function Testimonials() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [slideWidth, setSlideWidth] = useState(0);
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };
  
  useEffect(() => {
    const updateSlideWidth = () => {
      if (sliderRef.current) {
        const containerWidth = sliderRef.current.offsetWidth;
        // On mobile, each slide is full width
        // On desktop, each slide is 1/3 of the width
        setSlideWidth(window.innerWidth < 768 ? containerWidth : containerWidth / 3);
      }
    };
    
    updateSlideWidth();
    window.addEventListener("resize", updateSlideWidth);
    
    return () => {
      window.removeEventListener("resize", updateSlideWidth);
    };
  }, []);
  
  return (
    <SectionWrapper id="testimonials" className="py-20 bg-white text-black">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          What do students say about Inphynitics?
        </motion.h2>
        
        <div className="relative overflow-hidden">
          <motion.div
            ref={sliderRef}
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * slideWidth}px)` }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="w-full md:w-1/3 min-w-full md:min-w-[33.333%] px-4"
                style={{ width: slideWidth }}
              >
                <div className="text-center">
                  <div className="inline-block mb-4">
                    <img 
                      src={testimonial.avatar}
                      alt={`${testimonial.name} portrait`} 
                      className="w-16 h-16 object-cover rounded-full mx-auto"
                    />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">{testimonial.name}</h3>
                  <div className="flex justify-center mb-3">
                    <span className="text-primary">★★★★★</span>
                  </div>
                  <p className="text-gray-600">{testimonial.content}</p>
                </div>
              </div>
            ))}
          </motion.div>
          
          <button 
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white shadow-md rounded-full w-10 h-10 flex items-center justify-center z-10"
            onClick={prevSlide}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button 
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-primary rounded-full w-10 h-10 flex items-center justify-center z-10"
            onClick={nextSlide}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </SectionWrapper>
  );
}
