// components/Header.tsx
import Link from 'next/link';
import { useState } from 'react';
import { FiMenu, FiSearch, FiHeart, FiBell, FiUser } from 'react-icons/fi';
import useUser from '../utils/useUser';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useUser();

  return (
    <header className="bg-teal-600 text-white p-4 flex items-center justify-between relative">
      {/* Logo */}
      <Link href="/" className="text-xl font-bold">
        Go Shary
      </Link>

      {/* Ikony + profil */}
      <div className="flex items-center gap-4">
        <Link href="/vyhledavani">
          <FiSearch size={20} />
        </Link>

        <Link href="/oblibene">
          <FiHeart size={20} />
        </Link>

        <Link href="/notifikace" className="relative">
          <FiBell size={20} />
          <span className="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full px-1">
            3
          </span>
        </Link>

        {user ? (
          <div className="flex items-center gap-2 text-sm">
            <FiUser />
            <span className="hidden sm:inline">👋 {user.name}</span>
            <button
              onClick={logout}
              className="ml-1 underline text-white hover:text-gray-200 text-xs"
            >
              Odhlásit
            </button>
          </div>
        ) : (
          <Link href="/prihlaseni" className="underline text-sm">
            Přihlásit
          </Link>
        )}

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="sm:hidden focus:outline-none"
        >
          <FiMenu size={24} />
        </button>
      </div>

      {/* Dropdown menu */}
      {menuOpen && (
        <nav className="absolute top-full left-0 w-full bg-white text-gray-800 shadow-md p-4 space-y-2 z-10">
          <Link href="/nabidka" className="block hover:text-teal-600">
            Nabídky
          </Link>
          <Link href="/poptavka" className="block hover:text-teal-600">
            Poptávky
          </Link>
          <Link href="/pridat" className="block hover:text-teal-600">
            ➕ Přidat inzerát
          </Link>
        </nav>
      )}
    </header>
  );
}
