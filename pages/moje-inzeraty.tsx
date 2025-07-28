import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function MojeInzeraty() {
  const { data: session, status } = useSession();
  const [mojeInzeraty, setMojeInzeraty] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'authenticated') {
      const fetchData = async () => {
        setLoading(true);
        try {
          const res = await fetch('/api/user/my-ads');
          const data = await res.json();
          setMojeInzeraty(Array.isArray(data) ? data : []);
        } catch (error) {
          console.error('Chyba při načítání inzerátů:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
    if (status === 'unauthenticated') {
      setLoading(false);
    }
  }, [status]);

  const handleDelete = async (inzeratId: string) => {
    if (!window.confirm('Opravdu chcete smazat tento inzerát?')) {
      return;
    }

    try {
      const res = await fetch(`/api/inzeraty/${inzeratId}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Nepodařilo se smazat inzerát.');
      }

      // Odebereme smazaný inzerát z lokálního stavu
      setMojeInzeraty((prevInzeraty) =>
        prevInzeraty.filter((inzerat) => inzerat.id !== inzeratId)
      );
    } catch (error: any) {
      alert(`Chyba: ${error.message}`);
    }
  };

  if (loading || status === 'loading') {
    return <p>Načítání...</p>;
  }

  return (
    <>
      <Head>
        <title>Moje inzeráty | GoShary</title>
      </Head>
      <main className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Moje inzeráty</h1>
        {mojeInzeraty.length === 0 ? (
          <p className="text-gray-500">Zatím jste nepřidali žádný inzerát.</p>
        ) : (
          <ul className="space-y-4">
            {mojeInzeraty.map((item) => (
              <li
                key={item.id}
                className="border border-gray-200 rounded p-4 hover:shadow-md transition"
              >
                <div className="flex justify-between items-center">
                  <div>
                  <Link
                    href={`/${item.typStranky}/${item.id}?from=moje-inzeraty`}
                    className="text-lg font-semibold text-teal-700 hover:underline"
                  >
                    {item.titulek}
                  </Link>
                    <p className="text-sm text-gray-500">{item.lokalita}</p>
                  </div>
                  <div className="space-x-4">
                    <Link
                      href={`/inzeraty/${item.id}/edit`}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Upravit
                    </Link>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-sm text-red-600 hover:underline"
                    >
                      Smazat
                    </button>
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-700 line-clamp-2">{item.popis}</p>
              </li>
            ))}
          </ul>
        )}
      </main>
    </>
  );
}