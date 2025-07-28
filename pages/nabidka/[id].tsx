import { GetServerSideProps } from 'next';
import { prisma } from '../../lib/prisma';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };
  const inzerat = await prisma.inzerat.findUnique({
    where: { id },
    include: { 
      autor: {
        select: { name: true, image: true } // Načítáme jen bezpečná data
      }, 
      fotky: true 
    },
  });

  // Cesta 1: Inzerát nenalezen
  if (!inzerat) {
    return { notFound: true };
  }

  // Cesta 2: Inzerát nalezen - vrátíme props
  // Používáme JSON.parse/stringify pro bezpečnou serializaci dat (např. datumů)
  return {
    props: {
      inzerat: JSON.parse(JSON.stringify(inzerat)),
    },
  };
};

export default function DetailInzeratu({ inzerat }: any) {
  const router = useRouter();
  const { from } = router.query;

  let backLinkHref = `/${inzerat.typStranky}`;
  let backLinkText = `Zpět na ${inzerat.typStranky}`;

  if (from === 'moje-inzeraty') {
    backLinkHref = '/moje-inzeraty';
    backLinkText = 'Zpět na Moje inzeráty';
  }

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-6">
      <Link href={backLinkHref} className="text-blue-600 hover:underline">
        ← {backLinkText}
      </Link>

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
        <p><span className="font-semibold">Autor:</span> {inzerat.autor.name}</p>
      </div>
    </main>
  );
}