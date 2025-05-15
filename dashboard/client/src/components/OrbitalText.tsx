import { useRef, useEffect } from "react";
import { SectionWrapper } from "./ui/section-wrapper";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import planetImage from "../assets/planet.png";

// Register plugins
gsap.registerPlugin(MotionPathPlugin);

type OrbitalWord = {
  text: string;
  angle: number;
  orbit: number;
  emphasis?: boolean;
}

// Match the exact words from the mockup, marking emphasis for larger words
const orbitalWords: OrbitalWord[] = [
  { text: "Physics", angle: 0, orbit: 0, emphasis: true },
  { text: "Engage", angle: 30, orbit: 1, emphasis: true },
  { text: "Entertain", angle: 60, orbit: 2, emphasis: true },
  { text: "Educate", angle: 90, orbit: 0, emphasis: true },
  { text: "Discover", angle: 120, orbit: 1, emphasis: true },
  { text: "Learn", angle: 150, orbit: 2, emphasis: true },
  { text: "Explore", angle: 180, orbit: 0, emphasis: true },
  { text: "Question", angle: 210, orbit: 1 },
  { text: "Imagine", angle: 240, orbit: 2 },
  { text: "Fun", angle: 270, orbit: 0 },
  { text: "easy", angle: 285, orbit: 1 },
  { text: "Inspire", angle: 300, orbit: 1 },
  { text: "Create", angle: 330, orbit: 2 },
];

export function OrbitalText() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const planetRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  
  useEffect(() => {
    if (!containerRef.current || !planetRef.current || !svgRef.current) return;
    
    const container = containerRef.current;
    const planet = planetRef.current;
    const svg = svgRef.current;
    
    // Define orbits with different radii and speeds to match the mockup
    const orbits = [
      { radius: 240, speed: 0.7, color: "rgba(120, 100, 200, 0.3)" }, // Inner orbit (purple tint)
      { radius: 300, speed: 0.5, color: "rgba(100, 130, 220, 0.2)" }, // Middle orbit (blue tint)
      { radius: 360, speed: 0.3, color: "rgba(70, 160, 220, 0.1)" },  // Outer orbit (light blue tint)
    ];
    
    // Get dimensions
    const containerRect = container.getBoundingClientRect();
    const planetRect = planet.getBoundingClientRect();
    
    // Calculate planet position in relation to the container
    const planetCenterX = planetRect.left - containerRect.left + planetRect.width / 2;
    const planetCenterY = planetRect.top - containerRect.top + planetRect.height / 2;
    
    // Create orbital paths in SVG - these are the actual orbital rings
    const orbitalPaths: SVGPathElement[] = [];
    
    orbits.forEach((orbit, i) => {
      const orbitalPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
      orbitalPath.setAttribute('id', `orbit-path-${i}`);
      orbitalPath.setAttribute('d', `M ${planetCenterX + orbit.radius} ${planetCenterY} 
                                     a ${orbit.radius} ${orbit.radius} 0 1 0 -${orbit.radius * 2} 0 
                                     a ${orbit.radius} ${orbit.radius} 0 1 0 ${orbit.radius * 2} 0`);
      orbitalPath.setAttribute('fill', 'none');
      orbitalPath.setAttribute('stroke', orbit.color);
      orbitalPath.setAttribute('stroke-width', '1.5');
      orbitalPath.setAttribute('stroke-dasharray', '2,4');
      
      svg.appendChild(orbitalPath);
      orbitalPaths.push(orbitalPath);
    });
    
    // Create a GSAP timeline for each word
    wordsRef.current.forEach((word, index) => {
      if (!word) return;
      
      const wordData = orbitalWords[index];
      const orbitIndex = wordData.orbit;
      const orbit = orbits[orbitIndex];
      const startAngle = wordData.angle;
      const isEmphasized = wordData.emphasis;
      
      // Position at the right starting angle on the circle with specific styling
      gsap.set(word, {
        opacity: 0,
        fontWeight: isEmphasized ? 700 : 500,
        fontSize: isEmphasized ? "1.25rem" : "1rem",
        letterSpacing: isEmphasized ? "0.05em" : "normal",
      });
      
      // Animate each word along its orbit path
      gsap.to(word, {
        duration: 40 / orbit.speed, // Slower for a more graceful motion
        ease: "linear",
        repeat: -1,
        motionPath: {
          path: `#orbit-path-${orbitIndex}`,
          align: `#orbit-path-${orbitIndex}`,
          alignOrigin: [0.5, 0.5],
          start: startAngle / 360,
          end: startAngle / 360 + 1,
          autoRotate: false,
        },
        opacity: 1,
        onUpdate: function() {
          // Get the current position of the word
          const progress = this.progress();
          const currentAngle = (startAngle / 360 + progress) % 1; // Normalized 0-1
          
          // When the word is "behind" the planet (left side), reduce opacity
          const isBackHalf = currentAngle > 0.25 && currentAngle < 0.75;
          
          // Gradient opacity based on position (completely invisible when directly behind)
          let opacity = 1;
          if (isBackHalf) {
            // Calculate how "behind" the planet the word is (0.5 = directly behind)
            const behindFactor = 1 - Math.abs(currentAngle - 0.5) * 4; // 0 at edges, 1 at center
            opacity = 0.3 - (behindFactor * 0.3); // Minimum 0 opacity when directly behind
          }
          
          // Scale and opacity effects
          gsap.set(word, { 
            opacity, 
            scale: isBackHalf ? 0.8 : 1,
            filter: isBackHalf ? "blur(1px)" : "none"
          });
        }
      });
    });
    
    // Cleanup
    return () => {
      orbitalPaths.forEach(path => path.remove());
      gsap.killTweensOf(wordsRef.current);
    };
  }, []);
  
  return (
    <SectionWrapper id="orbit" className="h-[700px] relative py-20 mb-20 overflow-hidden">
      <div ref={containerRef} className="container mx-auto relative h-full">
        {/* Background glow */}
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-purple-900/10 to-blue-800/5 blur-[100px] z-0"></div>
      
        {/* SVG for orbital paths */}
        <svg 
          ref={svgRef} 
          className="absolute inset-0 w-full h-full z-0"
          xmlns="http://www.w3.org/2000/svg"
        ></svg>
        
        {/* Planet */}
        <div 
          ref={planetRef}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 w-[380px] h-[380px] z-20 animate-pulse-slow"
        >
          <div className="w-full h-full rounded-full overflow-hidden relative">
            {/* Glow effects */}
            <div className="absolute -inset-8 rounded-full bg-gradient-to-r from-indigo-600/20 to-purple-600/10 blur-[50px] opacity-60"></div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-600/30 to-purple-700/40 blur-[30px] opacity-80"></div>
            
            {/* Planet image */}
            <img 
              src={planetImage}
              alt="Blue and purple planet with dynamic swirls" 
              className="w-full h-full object-cover relative z-10 rounded-full"
            />
            
            {/* Ring effect - matching the mockup's look */}
            <div className="absolute -inset-8 rounded-full border-[6px] border-transparent opacity-40 blur-[2px] z-20"
                style={{ 
                  background: "transparent",
                  backgroundImage: "linear-gradient(135deg, rgba(138, 180, 255, 0.2), rgba(255, 161, 245, 0.1))",
                  borderRadius: "50%",
                  transform: "rotate(-30deg) scale(1.05)",
                  clipPath: "ellipse(50% 50% at 50% 50%)"
                }}></div>
          </div>
        </div>
        
        {/* Orbital words */}
        <div className="absolute inset-0 z-10">
          {orbitalWords.map((word, index) => (
            <span
              key={word.text}
              ref={(el) => (wordsRef.current[index] = el)}
              className={`absolute whitespace-nowrap ${word.emphasis ? 'text-white' : 'text-gray-300'}`}
            >
              {word.text}
            </span>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
