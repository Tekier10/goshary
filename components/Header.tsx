// soubor: components/Header.tsx

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { FiSearch, FiHeart, FiBell, FiUser, FiMenu } from 'react-icons/fi';
import { useSession, signOut } from 'next-auth/react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const { data: session, status } = useSession();
  const router = useRouter();

  return (
    <header className="bg-teal-500 text-white p-4 shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Go Shary
        </Link>

        {/* Menu napravo pro desktop */}
        <div className="hidden sm:flex items-center gap-6">
          <Link href="/jak-to-funguje" className="hover:underline">Jak to funguje</Link>
          <Link href="/poptavka" className="hover:underline">Poptávka</Link>
          <Link href="/nabidka" className="hover:underline">Nabídka</Link>
          <Link href="/kontakt" className="hover:underline">Kontakt</Link>
        </div>

        {/* Ikony vpravo */}
        <div className="flex items-center gap-4 text-white">
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

          {/* Logika pro ikonu uživatele a menu */}
          <div className="relative">
            {status === 'loading' ? (
              <FiUser size={20} className="opacity-50" />
            ) : status === 'authenticated' ? (
              <>
                <button onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)} aria-label="Profil">
                  <FiUser size={20} />
                </button>
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 border rounded shadow-lg text-sm z-50 p-3">
                    <p className="mb-2 font-semibold">
                      👤 {session.user?.name || session.user?.email}
                    </p>
                    
                    {/* === PŘIDANÁ ČÁST PRO ADMINA === */}
                    {session.user?.role === 'ADMIN' && (
                      <>
                        <div className="border-t my-2"></div>
                        <Link href="/admin">
                          <span className="block w-full text-left px-1 py-1 hover:bg-gray-100 cursor-pointer">
                            Admin Panel
                          </span>
                        </Link>
                      </>
                    )}
                    {/* === KONEC PŘIDANÉ ČÁSTI === */}

                    <div className="border-t my-2"></div>
                    <button
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                        signOut({ callbackUrl: '/' });
                      }}
                      className="text-red-600 hover:underline w-full text-left px-1 py-1"
                    >
                      Odhlásit
                    </button>
                  </div>
                )}
              </>
            ) : (
              <Link href="/prihlasit" aria-label="Přihlášení">
                <FiUser size={20} />
              </Link>
            )}
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="sm:hidden focus:outline-none"
            aria-label="Menu"
          >
            <FiMenu size={24} />
          </button>
        </div>
      </div>

      {/* Rozbalené menu v mobilu */}
      {isMobileMenuOpen && (
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