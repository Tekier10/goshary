import { GetServerSideProps } from 'next';
import { prisma } from '../../lib/prisma';
import Image from 'next/image';
import Link from 'next/link';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };
  const inzerat = await prisma.inzerat.findUnique({
    where: { id },
    include: { autor: true, fotky: true },
  });

  if (!inzerat) {
    return { notFound: true };
  }

  // Převod Date na string pro serializaci
  const autor = {
    ...inzerat.autor,
    createdAt: inzerat.autor.createdAt.toISOString(),
  };

  return {
    props: {
      inzerat: {
        ...inzerat,
        autor,
      },
    },
  };
};

export default function DetailInzeratu({ inzerat }: any) {
  return (
    <main className="max-w-3xl mx-auto p-6 space-y-6">
      <Link href={`/${inzerat.typStranky}`} className="text-blue-600 hover:underline">← Zpět na {inzerat.typStranky}</Link>

      <h1 className="text-3xl font-bold">{inzerat.titulek}</h1>
      <p className="text-gray-700 italic">{inzerat.typ} – {inzerat.lokalita}</p>

      {inzerat.fotky.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {inzerat.fotky.map((f: any) => (
            <Image
              key={f.id}
              src={f.url}
              alt="Foto"
              width={400}
              height={300}
              className="rounded border object-cover"
            />
          ))}
        </div>
      )}

      <div className="space-y-2">
        <p>{inzerat.popis}</p>
        <p><span className="font-semibold">Kontakt:</span> {inzerat.kontakt}</p>
        <p><span className="font-semibold">Autor:</span> {inzerat.autor.jmeno}</p>
      </div>
    </main>
  );
}