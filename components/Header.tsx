// components/Header.tsx

import Link from 'next/link';
import { useState } from 'react';
import { FaBell, FaHeart, FaUser, FaSearch, FaBars, FaTimes } from 'react-icons/fa';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const unreadCount = 3; // TODO: Replace with dynamic logic later

  return (
    <header className="bg-teal-500 text-white shadow">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold">
          Go Shary
        </Link>

        {/* Right-side icons */}
        <div className="flex items-center gap-4">
          {/* Desktop menu */}
          <div className="hidden sm:flex items-center gap-4">
            <Link href="/jak-to-funguje" className="hover:underline">Jak to funguje</Link>
            <Link href="/poptavka" className="hover:underline">Poptávka</Link>
            <Link href="/nabidka" className="hover:underline">Nabídka</Link>
            <Link href="/kontakt" className="hover:underline">Kontakt</Link>
          </div>

          {/* Ikony */}
          <Link href="/vyhledavani">
            <FaSearch className="w-5 h-5" />
          </Link>
          <Link href="/oblibene">
            <FaHeart className="w-5 h-5" />
          </Link>
          <Link href="/notifikace" className="relative">
            <FaBell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
                {unreadCount}
              </span>
            )}
          </Link>
          <Link href="/prihlaseni">
            <FaUser className="w-5 h-5" />
          </Link>

          {/* Hamburger menu – mobile */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="sm:hidden">
            {menuOpen ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobilní dropdown menu */}
      {menuOpen && (
        <nav className="sm:hidden bg-teal-400 text-white px-4 pb-4">
          <ul className="flex flex-col space-y-2">
            <li><Link href="/jak-to-funguje">Jak to funguje</Link></li>
            <li><Link href="/poptavka">Poptávka</Link></li>
            <li><Link href="/nabidka">Nabídka</Link></li>
            <li><Link href="/kontakt">Kontakt</Link></li>
          </ul>
        </nav>
      )}
    </header>
  );
}
