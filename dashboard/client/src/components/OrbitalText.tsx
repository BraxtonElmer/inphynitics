import { useRef, useEffect, useState } from "react";
import { SectionWrapper } from "./ui/section-wrapper";
import planetImage from "../assets/planet.png";

// Define the words to orbit around the planet
const orbitalWords = [
  "Physics", "Engage", "Entertain", "Educate", "Discover", 
  "Learn", "Explore", "Question", "Imagine", "Fun", 
  "Easy", "Inspire", "Create"
];

export function OrbitalText() {
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  
  // Handle screen size detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile(); // Initial check
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Helper function to map a value from one range to another
  function mapRange(value: number, inMin: number, inMax: number, outMin: number, outMax: number): number {
    return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
  }
  
  // Set up the animation for revolving words and planet pulse
  useEffect(() => {
    // Initial animation state
    let frame = 0;
    
    // Set up planet pulse animation
    const planet = document.querySelector('.planet-container');
    let planetPulseSize = 1.0;
    let pulseDirection = 0.0005;
    
    // Animation function for text revolution and planet pulse
    const animateElements = () => {
      // Get all orbiting words
      const words = document.querySelectorAll('.orbital-word');
      if (words.length === 0 || !planet) {
        animationRef.current = requestAnimationFrame(animateElements);
        return;
      }
      
      // Animate planet pulsing
      planetPulseSize += pulseDirection;
      if (planetPulseSize > 1.03) {
        pulseDirection = -0.0005;
      } else if (planetPulseSize < 0.97) {
        pulseDirection = 0.0005;
      }
      
      // Apply planet pulsing effect
      (planet as HTMLElement).style.transform = `scale(${planetPulseSize})`;
      
      words.forEach((word, index) => {
        // Calculate angle - distribute words evenly around orbit
        const baseAngle = (index / words.length) * 2 * Math.PI;
        const angle = baseAngle + (frame * 0.0003); // Even slower rotation for smoother appearance
        
        // Calculate coordinates in 3D space
        const x = Math.cos(angle);
        const z = Math.sin(angle);
        
        // Scale varies with Z position (distance from viewer)
        const scale = mapRange(z, -1, 1, 1.2, 0.8);
        
        // Calculate screen position
        const screenX = 50 + x * 40; // Horizontal position
        const screenY = 50 + z * 15; // Vertical position varies with depth
                
        // Apply position and style to the word element
        const wordEl = word as HTMLElement;
        
        // Make animation smoother with CSS transitions
        if (!wordEl.style.transition) {
          // Set this only once to avoid overriding during animation
          wordEl.style.transition = 'left 0.4s ease-out, top 0.4s ease-out, transform 0.3s ease-out, opacity 0.5s ease, filter 0.5s ease';
        }
        
        wordEl.style.left = `${screenX}%`;
        wordEl.style.top = `${screenY}%`;
        wordEl.style.transform = `translate(-50%, -50%) scale(${scale})`;
        
        // Words in front are more visible, words behind are more hidden
        if (z < 0) {
          // Text is in FRONT half - fully visible, above rings
          wordEl.style.opacity = '1';
          wordEl.style.filter = 'none';
          wordEl.style.zIndex = '35'; // Above front rings
          wordEl.style.fontSize = isMobile ? '1.5rem' : '2.2rem';
        } else {
          // Text is in BACK half - less visible, behind rings
          wordEl.style.opacity = '0.15';
          wordEl.style.filter = `blur(${z * 2}px)`;
          wordEl.style.zIndex = '5'; // Below back rings
          wordEl.style.fontSize = isMobile ? '1.2rem' : '1.7rem';
        }
      });
      
      // Continue animation
      frame++;
      animationRef.current = requestAnimationFrame(animateElements);
    };
    
    // Start animation
    animationRef.current = requestAnimationFrame(animateElements);
    
    // Clean up on unmount
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isMobile]);
  
  // Responsive sizing
  const planetSize = isMobile ? "w-[250px] h-[250px]" : "w-[400px] h-[400px]";
  const sectionHeight = isMobile ? "h-[550px]" : "h-[800px]";
  
  // Calculate ring sizes for responsiveness - now even wider for bigger visual impact
  const ringWidths = {
    // Rings behind the planet
    behind1: isMobile ? "w-[600px]" : "w-[1200px]",
    behind2: isMobile ? "w-[550px]" : "w-[1100px]",
    // Rings in front of the planet
    front1: isMobile ? "w-[650px]" : "w-[1300px]",
    front2: isMobile ? "w-[700px]" : "w-[1400px]",
    front3: isMobile ? "w-[750px]" : "w-[1500px]",
  };
  
  // Calculate ring heights (flattened for perspective)
  const ringHeights = {
    behind1: isMobile ? "h-[150px]" : "h-[300px]",
    behind2: isMobile ? "h-[140px]" : "h-[280px]",
    front1: isMobile ? "h-[160px]" : "h-[320px]",
    front2: isMobile ? "h-[170px]" : "h-[340px]",
    front3: isMobile ? "h-[180px]" : "h-[360px]",
  };
  
  return (
    <SectionWrapper id="orbit" className={`${sectionHeight} relative py-8 mb-20 overflow-hidden bg-black`}>
      <div ref={containerRef} className="container mx-auto relative h-full flex items-center justify-center">
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 to-blue-800/5 blur-[100px] z-0"></div>
        
        {/* Rings that go BEHIND the planet */}
        <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 5 }}>
          {/* Use clip-path to show only the BOTTOM half of these rings */}
          <div className={`absolute ${ringWidths.behind1} ${ringHeights.behind1} rounded-full`} 
              style={{ 
                transform: 'rotateX(75deg) rotateZ(-6deg)',
                border: '3px solid rgba(180, 120, 255, 0.7)',
                borderRadius: '50%',
                boxShadow: '0 0 20px rgba(180, 120, 255, 0.5)',
                clipPath: 'polygon(0% 50%, 100% 50%, 100% 100%, 0% 100%)', /* Only show bottom half */
              }}>
          </div>
          
          <div className={`absolute ${ringWidths.behind2} ${ringHeights.behind2} rounded-full`} 
              style={{ 
                transform: 'rotateX(75deg) rotateZ(-6deg)',
                border: '2px solid rgba(150, 160, 255, 0.8)',
                borderRadius: '50%',
                boxShadow: '0 0 15px rgba(150, 160, 255, 0.6)',
                clipPath: 'polygon(0% 50%, 100% 50%, 100% 100%, 0% 100%)', /* Only show bottom half */
              }}>
          </div>
        </div>
        
        {/* Orbiting words - positioned separately so they can be layered properly */}
        <div className="absolute inset-0">
          {orbitalWords.map((word, index) => (
            <div
              key={word}
              className="orbital-word absolute text-white font-bold whitespace-nowrap"
              style={{
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                textShadow: '0 0 15px rgba(150, 100, 255, 0.8)'
              }}
            >
              {word}
            </div>
          ))}
        </div>
        
        {/* MIDDLE: The planet - positioned between back and front rings */}
        <div className={`${planetSize} relative planet-container`} style={{ zIndex: 20, transition: 'transform 0.5s ease-in-out' }}>
          <div className="w-full h-full rounded-full overflow-hidden relative">
            {/* Glow effects */}
            <div className="absolute -inset-8 rounded-full bg-gradient-to-r from-indigo-600/40 to-purple-600/40 blur-[80px] opacity-90"></div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-600/50 to-purple-700/60 blur-[30px] opacity-90"></div>
            
            {/* Planet image */}
            <img 
              src={planetImage}
              alt="Blue and purple planet with dynamic swirls" 
              className="w-full h-full object-cover relative z-10 rounded-full"
            />
          </div>
        </div>
        
        {/* Rings that go IN FRONT of the planet */}
        <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 30 }}>
          {/* Use clip-path to show only the TOP half of these rings */}
          <div className={`absolute ${ringWidths.front1} ${ringHeights.front1} rounded-full`} 
              style={{ 
                transform: 'rotateX(75deg) rotateZ(-6deg)',
                border: '3px solid rgba(180, 120, 255, 0.8)',
                borderRadius: '50%',
                boxShadow: '0 0 25px rgba(180, 120, 255, 0.6)',
                clipPath: 'polygon(0% 0%, 100% 0%, 100% 50%, 0% 50%)', /* Only show top half */
              }}>
          </div>
          
          <div className={`absolute ${ringWidths.front2} ${ringHeights.front2} rounded-full`} 
              style={{ 
                transform: 'rotateX(75deg) rotateZ(-6deg)',
                border: '2px solid rgba(150, 160, 255, 0.7)',
                borderRadius: '50%',
                boxShadow: '0 0 20px rgba(150, 160, 255, 0.5)',
                clipPath: 'polygon(0% 0%, 100% 0%, 100% 50%, 0% 50%)', /* Only show top half */
              }}>
          </div>
          
          <div className={`absolute ${ringWidths.front3} ${ringHeights.front3} rounded-full`} 
              style={{ 
                transform: 'rotateX(75deg) rotateZ(-6deg)',
                border: '3px solid rgba(180, 120, 255, 0.6)',
                borderRadius: '50%',
                boxShadow: '0 0 30px rgba(180, 120, 255, 0.5)',
                clipPath: 'polygon(0% 0%, 100% 0%, 100% 50%, 0% 50%)', /* Only show top half */
              }}>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
