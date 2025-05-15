import { forwardRef, useEffect, useRef } from "react";

export const WaveBackground = forwardRef<HTMLDivElement>((props, ref) => {
  const animationRef = useRef<number>();
  const wave1Ref = useRef<SVGPathElement>(null);
  const wave2Ref = useRef<SVGPathElement>(null);
  const wave3Ref = useRef<SVGPathElement>(null);
  
  useEffect(() => {
    // Return early if any refs are null
    if (!wave1Ref.current || !wave2Ref.current || !wave3Ref.current) return;
    
    // Safe to use non-null assertion since we checked above
    const wave1 = wave1Ref.current!;
    const wave2 = wave2Ref.current!;
    const wave3 = wave3Ref.current!;
    
    let position = 0;
    
    function animateWave() {
      position -= 1;
      
      // Use SVG's transform attribute to move the waves horizontally at different speeds
      wave1.setAttribute('transform', `translate(${position % 2000})`);
      wave2.setAttribute('transform', `translate(${(position * 0.7) % 2000})`);
      wave3.setAttribute('transform', `translate(${(position * 0.4) % 2000})`);
      
      animationRef.current = requestAnimationFrame(animateWave);
    }
    
    animationRef.current = requestAnimationFrame(animateWave);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden"
      style={{
        background: "linear-gradient(to bottom, #000000, #151515)",
      }}
    >
      {/* Dark gold vignette overlay */}
      <div 
        className="absolute top-0 left-0 w-full h-full"
        style={{
          background: "radial-gradient(ellipse at center, rgba(30, 20, 0, 0.2) 0%, rgba(0, 0, 0, 0.5) 100%)",
        }}
      />
      
      {/* Wave gradients */}
      <svg width="0" height="0">
        <defs>
          <linearGradient id="wave-gradient-1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(248, 197, 55, 0.3)" />
            <stop offset="50%" stopColor="rgba(248, 197, 55, 0.15)" />
            <stop offset="100%" stopColor="rgba(248, 197, 55, 0.05)" />
          </linearGradient>
          <linearGradient id="wave-gradient-2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(248, 197, 55, 0.25)" />
            <stop offset="50%" stopColor="rgba(248, 197, 55, 0.1)" />
            <stop offset="100%" stopColor="rgba(248, 197, 55, 0.03)" />
          </linearGradient>
          <linearGradient id="wave-gradient-3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(248, 197, 55, 0.15)" />
            <stop offset="50%" stopColor="rgba(248, 197, 55, 0.07)" />
            <stop offset="100%" stopColor="rgba(248, 197, 55, 0.02)" />
          </linearGradient>
          <filter id="blur-filter" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" />
          </filter>
        </defs>
      </svg>
      
      <svg
        className="absolute w-full h-full"
        preserveAspectRatio="none"
        viewBox="0 0 2000 1000"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background glow */}
        <ellipse
          cx="1700"
          cy="300"
          rx="300"
          ry="200"
          fill="rgba(248, 197, 55, 0.03)"
          filter="url(#blur-filter)"
        />
        
        {/* Primary wave with solid fill - closest to mockup shape */}
        <path
          ref={wave1Ref}
          d="M -2000 350 C -1600 600 -1200 200 -800 350 C -400 600 0 200 400 350 C 800 600 1200 200 1600 350 C 2000 600 2400 200 2800 350 C 3200 600 3600 200 4000 350 L 4000 1000 L -2000 1000 Z"
          fill="url(#wave-gradient-1)"
          opacity="0.7"
        />
        
        {/* Secondary wave with different timing and shape */}
        <path
          ref={wave2Ref}
          d="M -2000 450 C -1600 250 -1200 550 -800 450 C -400 250 0 550 400 450 C 800 250 1200 550 1600 450 C 2000 250 2400 550 2800 450 C 3200 250 3600 550 4000 450 L 4000 1000 L -2000 1000 Z"
          fill="url(#wave-gradient-2)"
          opacity="0.5"
        />
        
        {/* Third wave for more layered effect */}
        <path
          ref={wave3Ref}
          d="M -2000 550 C -1600 400 -1200 700 -800 550 C -400 400 0 700 400 550 C 800 400 1200 700 1600 550 C 2000 400 2400 700 2800 550 C 3200 400 3600 700 4000 550 L 4000 1000 L -2000 1000 Z"
          fill="url(#wave-gradient-3)"
          opacity="0.3"
        />
      </svg>
    </div>
  );
});

WaveBackground.displayName = "WaveBackground";
