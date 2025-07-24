import { useEffect, useState } from 'react';

interface FavouriteButtonProps {
  inzeratId: string;
}

export default function FavouriteButton({ inzeratId }: FavouriteButtonProps) {
  const [isFavourite, setIsFavourite] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const res = await fetch('/api/oblibene');
        const data = await res.json();
        setIsFavourite(data.some((id: string) => id === inzeratId));
      } catch (error) {
        console.error('Chyba při načítání oblíbených:', error);
      }
    };
    fetchFavourites();
  }, [inzeratId]);

  const toggleFavourite = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/oblibene', {
        method: isFavourite ? 'DELETE' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inzeratId }),
      });

      if (res.ok) {
        setIsFavourite(!isFavourite);
      } else {
        console.error('Chyba při ukládání oblíbeného inzerátu.');
      }
    } catch (error) {
      console.error('Chyba při komunikaci s API:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={toggleFavourite}
      disabled={loading}
      className={`text-2xl transition-colors ${isFavourite ? 'text-red-500' : 'text-gray-400'} ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:text-red-500'}`}
      aria-label={isFavourite ? 'Odebrat z oblíbených' : 'Přidat do oblíbených'}
    >
      ♥
    </button>
  );
}
