import { GetServerSideProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { prisma } from '../lib/prisma';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const q = context.query.q as string;

  let inzeraty = [];
  if (q && q.trim() !== '') {
    inzeraty = await prisma.inzerat.findMany({
      where: {
        OR: [
          { titulek: { contains: q} },
          { popis: { contains: q} },
        ],
      },
      include: {
        fotky: true,
        autor: true,
      },
    });
  }

  return {
    props: {
      q: q || '',
      inzeraty: JSON.parse(JSON.stringify(inzeraty)),
    },
  };
};

export default function VyhledavaniPage({ q, inzeraty }: any) {
  const router = useRouter();

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Výsledky hledání pro „{q}“</h1>

      <form className="mb-8 flex gap-2" method="GET" action="/vyhledavani">
        <input
          type="text"
          name="q"
          placeholder="Hledat…"
          defaultValue={q}
          className="border rounded px-4 py-2 flex-1"
        />
        <button
          type="submit"
          className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 transition"
        >
          Hledat
        </button>
      </form>

      {inzeraty.length === 0 ? (
        <p className="text-gray-600">Žádné inzeráty nenalezeny.</p>
      ) : (
        <ul className="space-y-6">
          {inzeraty.map((inzerat: any) => (
            <li
              key={inzerat.id}
              className="p-4 border rounded hover:shadow transition"       >
              <Link
                href={`/${inzerat.typStranky}/${inzerat.id}`}
                className="flex items-center gap-4"
              >
                {inzerat.fotky[0]?.url && (
                  <Image
                    src={inzerat.fotky[0].url}
                    alt={inzerat.titulek}
                    width={100}
                    height={100}
                    className="rounded"
                  />
                )}
                <div>
                  <h2 className="text-lg font-semibold text-teal-700">
                    {inzerat.titulek}
                  </h2>
                  <p className="text-gray-600 text-sm">{inzerat.popis}</p>
                  <p className="text-gray-500 text-sm">
                    Autor: {inzerat.autor?.jmeno || 'Neznámý'}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
