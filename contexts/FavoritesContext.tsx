import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { useSession } from 'next-auth/react';

interface FavoritesContextType {
  favoriteIds: Set<string>;
  toggleFavorite: (inzeratId: string) => void;
  isLoading: boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession();
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  // Načtení oblíbených při přihlášení
  useEffect(() => {
    if (status === 'authenticated') {
      const fetchFavorites = async () => {
        setIsLoading(true);
        try {
          const res = await fetch('/api/favorites');
          if (!res.ok) {
            throw new Error('Nepodařilo se načíst oblíbené položky.');
          }
          const data = await res.json();
          setFavoriteIds(new Set(data.favoriteIds || []));
        } catch (error) {
          console.error("Chyba při načítání oblíbených:", error);
          setFavoriteIds(new Set()); // V případě chyby nastavíme prázdné
        } finally {
          // Tento blok se spustí vždy - ať už to dopadne dobře, nebo špatně
          setIsLoading(false);
        }
      };
      fetchFavorites();
    } else {
      setFavoriteIds(new Set()); // Vyčistíme oblíbené po odhlášení
      setIsLoading(false);
    }
  }, [status]);

  const toggleFavorite = useCallback(async (inzeratId: string) => {
    const originalFavorites = new Set(favoriteIds);
    
    // Optimistická aktualizace
    setFavoriteIds(prev => {
      const newFavs = new Set(prev);
      if (newFavs.has(inzeratId)) {
        newFavs.delete(inzeratId);
      } else {
        newFavs.add(inzeratId);
      }
      return newFavs;
    });

    // API volání
    const res = await fetch('/api/favorites/toggle', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ inzeratId }),
    });

    // Pokud API selže, vrátíme stav zpět
    if (!res.ok) {
      setFavoriteIds(originalFavorites);
      alert("Chyba: Zkuste to prosím znovu.");
    }
  }, [favoriteIds]);

  return (
    <FavoritesContext.Provider value={{ favoriteIds, toggleFavorite, isLoading }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};