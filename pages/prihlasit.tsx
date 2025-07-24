import { getCsrfToken, signIn } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useState } from 'react';

export default function Prihlasit({ csrfToken }: { csrfToken: string }) {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn('credentials', { email, callbackUrl: '/' });
  };

  return (
    <>
      <Head>
        <title>Přihlášení | GoShary</title>
      </Head>

      <main className="max-w-md mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Přihlášení</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <label className="block">
            <span className="text-sm">E-mail</span>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 rounded p-2 mt-1"
            />
          </label>
          <button
            type="submit"
            className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
          >
            Přihlásit
          </button>
        </form>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const csrfToken = await getCsrfToken(context);
  return {
    props: { csrfToken },
  };
};
