import { motion } from "framer-motion";

// This component creates a hand-drawn-like dotted path connecting the three cards
export function DottedPath() {
  return (
    <svg
      className="absolute top-0 left-0 w-full h-full pointer-events-none"
      viewBox="0 0 1000 1200" 
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* First path: top-left to top-right (more hand-drawn, wavy look) */}
      <motion.path
        d="M 100 120 Q 200 90, 300 130 Q 400 160, 500 120 Q 600 80, 700 110"
        stroke="#F8C537"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        filter="url(#hand-drawn)"
        strokeDasharray="18,22"
        initial={{ pathLength: 0, strokeDashoffset: 1000 }}
        animate={{ pathLength: 1, strokeDashoffset: 0 }}
        transition={{ 
          duration: 3,
          strokeDashoffset: {
            repeat: Infinity,
            duration: 20,
            ease: "linear"
          }
        }}
      />

      {/* Second path: top-right to middle-left (more curved) */}
      <motion.path
        d="M 700 250 Q 650 300, 550 325 Q 450 350, 350 370 Q 250 390, 150 380"
        stroke="#F8C537"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        filter="url(#hand-drawn)"
        strokeDasharray="18,22"
        initial={{ pathLength: 0, strokeDashoffset: -1000 }}
        animate={{ pathLength: 1, strokeDashoffset: 0 }}
        transition={{ 
          duration: 3, 
          delay: 0.5,
          strokeDashoffset: {
            repeat: Infinity,
            duration: 25,
            ease: "linear"
          }
        }}
      />

      {/* Third path: middle-left to bottom-right (major curve) */}
      <motion.path
        d="M 150 480 Q 200 550, 300 580 Q 400 610, 500 630 Q 600 650, 700 630"
        stroke="#F8C537"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        filter="url(#hand-drawn)"
        strokeDasharray="18,22"
        initial={{ pathLength: 0, strokeDashoffset: 1000 }}
        animate={{ pathLength: 1, strokeDashoffset: 0 }}
        transition={{ 
          duration: 3,
          delay: 1, 
          strokeDashoffset: {
            repeat: Infinity,
            duration: 22,
            ease: "linear"
          }
        }}
      />

      {/* Adding hand-drawn filter */}
      <defs>
        <filter id="hand-drawn" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" />
        </filter>
      </defs>

      {/* Interactive dots along the paths */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.circle
          key={`dot1-${i}`}
          cx={100 + i * 50}
          cy={120 + Math.sin(i * 0.5) * 30}
          r={Math.random() * 2 + 3}
          fill="#F8C537"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0, 1, 0],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut"
          }}
        />
      ))}

      {Array.from({ length: 12 }).map((_, i) => (
        <motion.circle
          key={`dot2-${i}`}
          cx={700 - i * 45}
          cy={250 + i * 12}
          r={Math.random() * 2 + 3}
          fill="#F8C537"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0, 1, 0],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.2 + 2,
            ease: "easeInOut"
          }}
        />
      ))}

      {Array.from({ length: 12 }).map((_, i) => (
        <motion.circle
          key={`dot3-${i}`}
          cx={150 + i * 45}
          cy={480 + i * 15}
          r={Math.random() * 2 + 3}
          fill="#F8C537"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0, 1, 0],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.2 + 4,
            ease: "easeInOut"
          }}
        />
      ))}
    </svg>
  );
}
