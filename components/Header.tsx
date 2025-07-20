// components/Header.tsx
import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { FaSearch, FaHeart, FaUser, FaBell } from 'react-icons/fa';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  // Simulovaný počet nepřečtených notifikací
  const unreadCount = 3;

  const NotificationIcon = () => (
    <div className="relative">
      <FaBell className="w-5 h-5" />
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full px-1.5 font-bold">
          {unreadCount}
        </span>
      )}
    </div>
  );

  return (
    <header className="bg-teal-500 text-white">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-black">
          Go Shary
        </Link>

        {/* Ikony – mobil */}
        <div className="flex items-center gap-4 order-2 sm:order-none sm:hidden">
          <Link href="/vyhledavani" title="Vyhledávání">
            <FaSearch className="text-white w-5 h-5" />
          </Link>
          <Link href="/oblibene" title="Oblíbené">
            <FaHeart className="text-white w-5 h-5" />
          </Link>
          <Link href="/notifikace" title="Notifikace">
            <NotificationIcon />
          </Link>
          <Link href="/prihlaseni" title="Přihlášení">
            <FaUser className="text-white w-5 h-5" />
          </Link>
        </div>

        <button
          className="sm:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menu"
        >
          {isOpen ? <X /> : <Menu />}
        </button>

        {/* Navigace – desktop */}
        <nav className="hidden sm:flex items-center gap-6 ml-auto">
          <Link href="/nabidka" className="hover:underline">
            Nabídka
          </Link>
          <Link href="/poptavka" className="hover:underline">
            Poptávka
          </Link>
          <Link href="/jak-to-funguje" className="hover:underline">
            Jak to funguje
          </Link>
          <Link href="/pridat" className="hover:underline">
            Přidat
          </Link>

          {/* Ikony – desktop */}
          <div className="flex items-center gap-4 ml-4">
            <Link href="/vyhledavani" title="Vyhledávání">
              <FaSearch className="w-5 h-5" />
            </Link>
            <Link href="/oblibene" title="Oblíbené">
              <FaHeart className="w-5 h-5" />
            </Link>
            <Link href="/notifikace" title="Notifikace">
              <NotificationIcon />
            </Link>
            <Link href="/prihlaseni" title="Přihlášení">
              <FaUser className="w-5 h-5" />
            </Link>
          </div>
        </nav>
      </div>

      {/* Rozbalené menu – mobil */}
      {isOpen && (
        <nav className="sm:hidden px-4 pb-4 space-y-2">
          <Link href="/nabidka" className="block text-white">
            Nabídka
          </Link>
          <Link href="/poptavka" className="block text-white">
            Poptávka
          </Link>
          <Link href="/jak-to-funguje" className="block text-white">
            Jak to funguje
          </Link>
          <Link href="/pridat" className="block text-white">
            Přidat
          </Link>
        </nav>
      )}
    </header>
  );
}
