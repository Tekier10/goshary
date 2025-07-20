// pages/prihlaseni.tsx – přihlašovací stránka

import Head from 'next/head';
import { useState } from 'react';

export default function Prihlaseni() {
  const [email, setEmail] = useState('');
  const [heslo, setHeslo] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Přihlašování...', { email, heslo });
    // TODO: odeslat přihlášení na backend
  };

  return (
    <>
      <Head>
        <title>Přihlášení | GoShary</title>
      </Head>
      <main className="max-w-md mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Přihlášení</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">E-mail</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Heslo</label>
            <input
              type="password"
              required
              value={heslo}
              onChange={(e) => setHeslo(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700 transition"
          >
            Přihlásit se
          </button>
        </form>
      </main>
    </>
  );
}
