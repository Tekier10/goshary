import { motion } from 'framer-motion';

export default function SharyLoader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 1.2, repeat: Infinity }}
        className="w-40 h-40"
      >
        <svg
          viewBox="0 0 210 297"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Obsah SVG vložený z CleanShary.svg – zkráceno pro přehlednost */}
          <g>
            <circle cx="100" cy="30" r="6" fill="#00B4B4" />
            <rect x="60" y="40" width="80" height="80" rx="20" fill="#00B4B4" stroke="#1A2A3A" strokeWidth="6" />
            <circle cx="85" cy="75" r="6" fill="#1A2A3A" />
            <circle cx="115" cy="75" r="6" fill="#1A2A3A" />
            <path d="M85 95 Q100 105 115 95" stroke="#1A2A3A" strokeWidth="4" fill="none" />
            <path d="M70 120 Q100 180 130 120" fill="#FFFFFF" stroke="#1A2A3A" strokeWidth="6" />
            <path d="M95 135 L105 135 L100 145 Z" fill="#1A2A3A" />
            <path d="M70 120 Q55 120 50 140" stroke="#1A2A3A" strokeWidth="6" fill="none" />
            <path d="M130 120 Q145 120 150 140" stroke="#1A2A3A" strokeWidth="6" fill="none" />
            <rect x="75" y="170" width="15" height="20" fill="#1A2A3A" rx="3" />
            <rect x="110" y="170" width="15" height="20" fill="#1A2A3A" rx="3" />
          </g>
        </svg>
      </motion.div>
      <motion.h1
        className="mt-6 text-2xl font-bold text-[#1A2A3A]"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0.5, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Go Shary!
      </motion.h1>
    </div>
  );
}
