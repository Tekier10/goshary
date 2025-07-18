// components/StorySection.tsx – jeden blok příběhu s mluvícím Sharym

import { motion } from 'framer-motion';
import MascotShary from './MascotShary';

interface StorySectionProps {
  emoji: string;
  title: string;
  text: string;
  speech: string;
}

export default function StorySection({ emoji, title, text, speech }: StorySectionProps) {
  return (
    <motion.div
      className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left px-4 py-10 border-b"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="text-4xl md:text-5xl bg-primary/10 p-6 rounded-full">{emoji}</div>
      <div className="flex-1">
        <h2 className="text-2xl font-semibold text-primary mb-2">{title}</h2>
        <p className="text-gray-700">{text}</p>
      </div>
      <div className="relative max-w-[120px]">
        <MascotShary />
        <div className="absolute -top-6 left-1/2 -translate-x-1/2">
          <div className="relative bg-white border border-gray-300 rounded-xl shadow px-4 py-2 text-sm text-gray-700 w-40">
            {speech}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-t-8 border-t-gray-300 border-l-8 border-l-transparent border-r-8 border-r-transparent"></div>
            <div className="absolute -bottom-[6px] left-1/2 -translate-x-1/2 w-0 h-0 border-t-8 border-t-white border-l-8 border-l-transparent border-r-8 border-r-transparent"></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
