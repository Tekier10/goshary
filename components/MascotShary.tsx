// components/MascotShary.tsx – maskot Shary

import Image from 'next/image';
import { motion } from 'framer-motion';
import sharyImg from '../public/shary.png'; // ujisti se, že je tam ten obrázek

export default function MascotShary() {
  return (
    <motion.div
      className="w-24 h-24 md:w-32 md:h-32"
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: [10, 0, 10], opacity: 1 }}
      transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
    >
      <Image
        src={sharyImg}
        alt="Maskot Shary"
        width={128}
        height={128}
        className="w-full h-full object-contain"
        priority
      />
    </motion.div>
  );
}
