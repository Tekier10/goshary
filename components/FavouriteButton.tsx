import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useFavorites } from '../contexts/FavoritesContext';
import { FiHeart } from 'react-icons/fi';

export default function FavouriteButton({ inzeratId }: { inzeratId: string }) {
  const { status } = useSession();
  const router = useRouter();
  const { favoriteIds, toggleFavorite, isLoading } = useFavorites();

  const isFavorited = favoriteIds.has(inzeratId);

  const handleClick = (e: React.MouseEvent) => {
    // 1. Zabrání prokliku na rodičovský element (např. Link)
    e.preventDefault(); 
    e.stopPropagation(); // Přidáno pro extra jistotu

    if (status !== 'authenticated') {
      router.push('/prihlasit');
      return;
    }
    
    // 2. Zavolá funkci z contextu, která provede API volání
    toggleFavorite(inzeratId);
  };

  // Tlačítko nezobrazujeme nepřihlášeným uživatelům
  if (status !== 'authenticated') {
    return null;
  }

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className={`text-2xl transition-colors ${isFavorited ? 'text-red-500' : 'text-gray-400'} ${isLoading ? 'opacity-50' : 'hover:text-red-500'}`}
      aria-label={isFavorited ? 'Odebrat z oblíbených' : 'Přidat do oblíbených'}
    >
      <FiHeart
        size={22}
        fill={isFavorited ? 'currentColor' : 'none'}
        stroke="currentColor"
      />
    </button>
  );
}