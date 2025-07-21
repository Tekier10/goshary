import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FiSearch, FiHeart, FiBell, FiUser, FiMenu } from 'react-icons/fi';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const storedUser = localStorage.getItem('goshary_user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch {
        setUser(null);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('goshary_user');
    setUser(null);
    router.push('/');
  };

  return (
    <header className="bg-teal-500 text-white px-4 py-3 shadow-md sticky top-0 z-50">
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between">
        {/* Logo vlevo */}
        <div className="flex-shrink-0">
          <Link href="/" className="text-xl font-bold text-white">
            Go Shary
          </Link>
        </div>

        {/* Střední část – ikony */}
        <div className="hidden sm:flex items-center gap-4 text-white">
          <Link href="/vyhledavani" aria-label="Vyhledávání">
            <FiSearch size={20} />
          </Link>
          <Link href="/oblibene" aria-label="Oblíbené">
            <FiHeart size={20} />
          </Link>
          <Link href="/notifikace" aria-label="Notifikace" className="relative">
            <FiBell size={20} />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5">3</span>
          </Link>
          <div className="relative">
            <Link href="/prihlaseni" aria-label="Přihlášení">
              <FiUser size={20} />
            </Link>
            {user && (
              <div className="absolute right-0 mt-2 w-40 bg-white text-gray-800 border rounded shadow text-sm z-50 p-3">
                <p className="mb-2">👤 {user.name}</p>
                <button
                  onClick={handleLogout}
                  className="text-red-600 hover:underline"
                >
                  Odhlásit
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Menu vpravo */}
        <div className="hidden sm:flex items-center gap-6 ml-auto">
          <Link href="/jak-to-funguje" className="hover:underline">Jak to funguje</Link>
          <Link href="/poptavka" className="hover:underline">Poptávka</Link>
          <Link href="/nabidka" className="hover:underline">Nabídka</Link>
          <Link href="/kontakt" className="hover:underline">Kontakt</Link>
        </div>

        {/* Hamburger pro mobil */}
        <div className="sm:hidden flex items-center gap-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
            aria-label="Menu"
          >
            <FiMenu size={24} />
          </button>
        </div>
      </div>

      {/* Rozbalené menu v mobilu */}
      {isOpen && (
        <nav className="sm:hidden px-4 pt-2 pb-4">
          <Link href="/jak-to-funguje" className="block py-1">Jak to funguje</Link>
          <Link href="/poptavka" className="block py-1">Poptávka</Link>
          <Link href="/nabidka" className="block py-1">Nabídka</Link>
          <Link href="/kontakt" className="block py-1">Kontakt</Link>
        </nav>
      )}
    </header>
  );
}
