import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';
import { prisma } from '../lib/prisma';
import { useState } from 'react';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session?.user?.email) {
    return {
      redirect: {
        destination: '/prihlasit',
        permanent: false,
      },
    };
  }

  // ZMĚNA ZDE: Používáme prisma.user místo prisma.uzivatel
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  const notifikace = await prisma.notifikace.findMany({
    where: {
      prijemceId: user?.id, // Používáme novou proměnnou
    },
    orderBy: { datum: 'desc' },
  });

  return {
    props: {
      notifikace: notifikace.map((n) => ({
        ...n,
        datum: n.datum.toISOString(),
      })),
    },
  };
};

// Zbytek souboru zůstává stejný
export default function NotifikacePage({ notifikace }: any) {
  const [seznam, setSeznam] = useState(notifikace);

  const oznacJakoPrectene = async () => {
    try {
      await fetch('/api/notifikace', {
        method: 'PUT',
      });
      setSeznam((prev: any[]) => prev.map((n) => ({ ...n, precteno: true })));
    } catch (err) {
      console.error('Chyba při označení všech notifikací:', err);
    }
  };

  const oznacJednu = async (id: string) => {
    try {
      await fetch(`/api/notifikace/${id}`, {
        method: 'PUT',
      });
      setSeznam((prev: any[]) => prev.map((n) => (n.id === id ? { ...n, precteno: true } : n)));
    } catch (err) {
      console.error('Chyba při označení notifikace:', err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Notifikace</h1>
      <button
        onClick={oznacJakoPrectene}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Označit vše jako přečtené
      </button>
      {Array.isArray(seznam) && seznam.length === 0 ? (
        <p>Žádné notifikace.</p>
      ) : (
        <ul className="space-y-3">
          {seznam.map((n) => (
            <li
              key={n.id}
              className={`p-4 border rounded ${n.precteno ? 'bg-gray-100' : 'bg-yellow-100'}`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p>{n.zprava}</p>
                  <p className="text-sm text-gray-500">{new Date(n.datum).toLocaleString()}</p>
                </div>
                {!n.precteno && (
                  <button
                    onClick={() => oznacJednu(n.id)}
                    className="ml-4 px-2 py-1 text-sm bg-green-600 text-white rounded"
                  >
                    Označit jako přečtené
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}