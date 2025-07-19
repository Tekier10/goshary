// components/Hodnoceni.tsx

import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

type Props = {
  hodnoceni: number; // hodnota mezi 0–5
};

export default function Hodnoceni({ hodnoceni }: Props) {
  const cele = Math.floor(hodnoceni);
  const maPuli = hodnoceni - cele >= 0.5;
  const prazdne = 5 - cele - (maPuli ? 1 : 0);

  return (
    <div className="flex items-center gap-1 text-yellow-500 text-lg">
      {[...Array(cele)].map((_, i) => (
        <FaStar key={`full-${i}`} />
      ))}
      {maPuli && <FaStarHalfAlt />}
      {[...Array(prazdne)].map((_, i) => (
        <FaRegStar key={`empty-${i}`} />
      ))}
      <span className="ml-2 text-sm text-gray-600">{hodnoceni.toFixed(1)} / 5</span>
    </div>
  );
}
