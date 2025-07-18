// components/Header.tsx

import { useState } from 'react'; import Link from 'next/link'; import { Menu, X, Search, Heart, User } from 'lucide-react';

export default function Header() { const [menuOpen, setMenuOpen] = useState(false);

return ( <header className="bg-teal-500 text-white shadow-sm"> <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <div className="flex justify-between items-center h-16"> {/* Logo */} <div className="flex-shrink-0"> <Link href="/"> <span className="text-xl font-bold text-white">GoShary</span> </Link> </div>

{/* Icons and Hamburger */}
      <div className="flex items-center space-x-4">
        <Link href="/search" className="hover:opacity-80 hidden sm:inline" title="Vyhledávání">
          <Search className="w-5 h-5" />
        </Link>
        <Link href="/favorites" className="hover:opacity-80 hidden sm:inline" title="Oblíbené">
          <Heart className="w-5 h-5" />
        </Link>
        <Link href="/login" className="hover:opacity-80 hidden sm:inline" title="Přihlášení">
          <User className="w-5 h-5" />
        </Link>
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-white">
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
    </div>
  </div>

  {/* Mobile menu */}
  {menuOpen && (
    <div className="sm:hidden px-4 pt-2 pb-4 bg-teal-600 text-white">
      <nav className="space-y-2">
        <Link href="/search" className="block">🔍 Vyhledávání</Link>
        <Link href="/favorites" className="block">❤️ Oblíbené</Link>
        <Link href="/login" className="block">👤 Přihlášení</Link>
        <Link href="/" className="block">🏠 Domů</Link>
        <Link href="/nabidky" className="block">📋 Nabídky</Link>
        <Link href="/pridat" className="block">➕ Přidat</Link>
        <Link href="/jak-to-funguje" className="block">❓ Jak to funguje</Link>
        <Link href="/kontakt" className="block">📬 Kontakt</Link>
      </nav>
    </div>
  )}
</header>

); }
