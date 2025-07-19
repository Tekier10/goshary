import Image from 'next/image'; import { motion } from 'framer-motion';

type SharyBubbleProps = { text: string; direction?: 'left' | 'right'; delay?: number; };

export default function SharyBubble({ text, direction = 'right', delay = 0 }: SharyBubbleProps) { return ( <div className={flex flex-col items-${direction === 'right' ? 'end' : 'start'} mt-6}>
<motion.div className="relative bg-white text-gray-700 rounded-xl px-4 py-2 shadow-md border border-gray-300 max-w-xs" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: 0.6 }} > {text} <div className={absolute ${direction === 'right' ? 'right-4' : 'left-4'} -bottom-2 w-0 h-0 border-t-[10px] border-t-white border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent} /> </motion.div>

<motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: delay + 0.3, duration: 0.6 }}
    className="w-20 mt-2"
  >
    <Image
      src="/shary.png"
      alt="Maskot Shary"
      width={80}
      height={80}
      className="mx-auto"
    />
  </motion.div>
</div>

); }

