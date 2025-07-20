// components/FavouriteButton.tsx 
import { useEffect, useState } from 'react'; import { FaHeart, FaRegHeart } from 'react-icons/fa'; import useFavourites from '../utils/useFavourites';

type Props = { id: string; };

export default function FavouriteButton({ id }: Props) { const { isFavourite, toggleFavourite } = useFavourites(); const [faved, setFaved] = useState(false);

useEffect(() => { setFaved(isFavourite(id)); }, [id, isFavourite]);

const handleClick = () => { toggleFavourite(id); setFaved(!faved); };

return ( <button
onClick={handleClick}
aria-label="Přidat do oblíbených"
className="text-red-500 text-xl hover:scale-110 transition-transform"
> {faved ? <FaHeart /> : <FaRegHeart />} </button> ); }

