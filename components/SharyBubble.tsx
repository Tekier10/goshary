import { motion } from 'framer-motion';

type Props = {
  text: string;
  direction?: 'left' | 'right';
};

export default function SharyBubble({ text, direction = 'right' }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`flex items-center ${direction === 'left' ? 'justify-start' : 'justify-end'} w-full mb-4`}
    >
      <div
        className={`relative bg-white border border-gray-300 rounded-lg px-4 py-2 shadow-sm max-w-xs text-sm text-gray-800
          ${direction === 'left' ? 'ml-12' : 'mr-12'}`}
      >
        {text}
        <div
          className={`absolute bottom-0 w-0 h-0 border-[10px] border-transparent 
            ${direction === 'left'
              ? 'left-[-20px] border-r-white border-r-[10px]'
              : 'right-[-20px] border-l-white border-l-[10px]'}`}
        ></div>
      </div>
    </motion.div>
  );
}
