import Link from 'next/link';
import { useState } from 'react';
import { FiMenu, FiSearch, FiHeart, FiBell, FiUser } from 'react-icons/fi';
import useUser from '../utils/useUser';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useUser();

  return (
    <header className="bg-teal-600 text-white p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo vlevo */}
        <Link href="/" className="text-xl font-bold">
          Go Shary
        </Link>

        {/* Desktop */}
        <div className="hidden sm:flex items-center gap-6">
          {/* Ikony */}
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
          </div>

          {/* Menu napravo */}
          <nav className="flex items-center gap-4">
            <Link href="/jak-to-funguje" className="hover:underline">Jak to funguje</Link>
            <Link href="/poptavka" className="hover:underline">Poptávka</Link>
            <Link href="/nabidka" className="hover:underline">Nabídka</Link>
            <Link href="/kontakt" className="hover:underline">Kontakt</Link>
          </nav>
        </div>

        {/* Mobilní verze – ikony + hamburger */}
        <div className="sm:hidden flex items-center gap-4">
          <Link href="/vyhledavani">
            <FiSearch size={20} />
          </Link>
          <Link href="/oblibene">
            <FiHeart size={20} />
          </Link>
          <Link href="/notifikace">
            <FiBell size={20} />
          </Link>
          <button onClick={() => setIsOpen(!isOpen)}>
            <FiMenu size={24} />
          </button>
        </div>
      </div>

      {/* Rozbalené menu v mobilu */}
      {isOpen && (
        <nav className="sm:hidden px-4 pt-2 pb-4 space-y-2 bg-white text-gray-800 shadow-md">
          <Link href="/jak-to-funguje" className="block py-1">Jak to funguje</Link>
          <Link href="/poptavka" className="block py-1">Poptávka</Link>
          <Link href="/nabidka" className="block py-1">Nabídka</Link>
          <Link href="/kontakt" className="block py-1">Kontakt</Link>
          <Link href="/pridat" className="block py-1">➕ Přidat inzerát</Link>
          {user ? (
            <button
              onClick={logout}
              className="block py-1 text-sm text-teal-600 underline"
            >
              Odhlásit
            </button>
          ) : (
            <Link href="/prihlaseni" className="block py-1 text-sm text-teal-600">
              Přihlásit
            </Link>
          )}
        </nav>
      )}
    </header>
  );
}
