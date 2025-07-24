import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import { FaHeart, FaBell, FaPlus, FaUser } from 'react-icons/fa';

const Header = () => {
  const { data: session } = useSession();
  const neprecteneNotifikace = 3; // TODO: dynamicky načíst z backendu

  return (
    <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <Link href="/">
        <span className="text-xl font-bold text-teal-600 cursor-pointer">Go Shary</span>
      </Link>

      <div className="flex items-center space-x-6">
        <Link href="/pridat" className="text-gray-600 hover:text-teal-600 text-lg">
          <FaPlus />
        </Link>

        <Link href="/oblibene" className="text-gray-600 hover:text-teal-600 text-lg">
          <FaHeart />
        </Link>

        <Link href="/notifikace" className="relative text-gray-600 hover:text-teal-600 text-lg">
          <FaBell />
          {neprecteneNotifikace > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
              {neprecteneNotifikace}
            </span>
          )}
        </Link>

        {session ? (
          <div className="flex items-center space-x-2">
            <FaUser className="text-gray-600" />
            <span className="text-sm text-gray-700">
              {session.user?.name || session.user?.email}
            </span>
            <button
              onClick={() => signOut()}
              className="text-sm text-blue-600 hover:underline"
            >
              Odhlásit
            </button>
          </div>
        ) : (
          <button
            onClick={() => signIn()}
            className="text-sm text-blue-600 hover:underline"
          >
            Přihlásit
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
