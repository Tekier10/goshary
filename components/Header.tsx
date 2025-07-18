// components/Header.tsx – hlavní navigace s hamburger menu

import { useState } from 'react'; import Link from 'next/link'; import { Menu, X } from 'lucide-react'; // ikonky

export default function Header() { const [open, setOpen] = useState(false);

const toggleMenu = () => setOpen(!open);

return ( <header className="flex items-center justify-between px-6 py-4 border-b bg-teal-500 text-white shadow sticky top-0 z-50"> <Link href="/"> <span className="text-xl font-bold text-primary">GoShary</span> </Link>

<nav className="hidden md:flex gap-6 text-sm font-medium text-gray-700">
    <Link href="/nabidky">Nabídky</Link>
    <Link href="/pridat">Přidat</Link>
    <Link href="/jak-to-funguje">Jak to funguje</Link>
    <Link href="/kontakt">Kontakt</Link>
  </nav>

  <button
    className="md:hidden text-gray-700"
    onClick={toggleMenu}
    aria-label="Otevřít menu"
  >
    {open ? <X size={24} /> : <Menu size={24} />}
  </button>

  {/* Mobile menu */}
  {open && (
    <div className="absolute top-full left-0 w-full bg-white shadow-md border-t md:hidden">
      <nav className="flex flex-col gap-4 p-4 text-sm text-gray-700">
        <Link href="/nabidky" onClick={toggleMenu}>Nabídky</Link>
        <Link href="/pridat" onClick={toggleMenu}>Přidat</Link>
        <Link href="/jak-to-funguje" onClick={toggleMenu}>Jak to funguje</Link>
        <Link href="/kontakt" onClick={toggleMenu}>Kontakt</Link>
      </nav>
    </div>
  )}
</header>

); }

