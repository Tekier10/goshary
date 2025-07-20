// pages/prihlaseni.tsx
import { useRouter } from 'next/router';
import { useState } from 'react';
import useUser from '../utils/useUser';
import Head from 'next/head';

export default function Prihlaseni() {
  const router = useRouter();
  const { login } = useUser();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ name, email });
    router.push('/');
  };

  return (
    <>
      <Head>
        <title>Přihlášení | GoShary</title>
      </Head>
      <main className="max-w-md mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Přihlášení</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Jméno"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700"
          >
            Přihlásit se
          </button>
        </form>
      </main>
    </>
  );
}
