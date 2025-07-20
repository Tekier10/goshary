// utils/useFavourites.ts 
import { useCallback } from 'react';
const FAV_KEY = 'goshary_favourites';

function getStoredFavourites(): string[] { if (typeof window === 'undefined') return []; try { return JSON.parse(localStorage.getItem(FAV_KEY) || '[]'); } catch { return []; } }

function setStoredFavourites(ids: string[]) { localStorage.setItem(FAV_KEY, JSON.stringify(ids)); }

export default function useFavourites() { const isFavourite = useCallback((id: string): boolean => { const favs = getStoredFavourites(); return favs.includes(id); }, []);

const toggleFavourite = useCallback((id: string) => { const favs = getStoredFavourites(); const newFavs = favs.includes(id) ? favs.filter((f) => f !== id) : [...favs, id]; setStoredFavourites(newFavs); }, []);

const getFavourites = useCallback((): string[] => { return getStoredFavourites(); }, []);

return { isFavourite, toggleFavourite, getFavourites }; }

