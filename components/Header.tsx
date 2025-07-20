import Link from 'next/link';
import { useState } from 'react';
import { FiMenu, FiSearch, FiHeart, FiBell, FiUser } from 'react-icons/fi';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-teal-600 text-white p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
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
            <Link href="/prihlaseni">
              <FiUser size={20} />
            </Link>
          </div>

          {/* Menu vpravo */}
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
          <Link href="/prihlaseni">
            <FiUser size={20} />
          </Link>
          <button onClick={() => setIsOpen(!isOpen)}>
            <FiMenu size={24} />
          </button>
        </div>
      </div>

      {/* Mobilní rozbalené menu */}
      {isOpen && (
        <nav className="sm:hidden px-4 pt-2 pb-4 space-y-2 bg-white text-gray-800 shadow-md">
          <Link href="/jak-to-funguje" className="block py-1">Jak to funguje</Link>
          <Link href="/poptavka" className="block py-1">Poptávka</Link>
          <Link href="/nabidka" className="block py-1">Nabídka</Link>
          <Link href="/kontakt" className="block py-1">Kontakt</Link>
        </nav>
      )}
    </header>
  );
}
