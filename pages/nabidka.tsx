import Link from 'next/link';

const nabidky = [
  {
    id: '1',
    typ: 'Stroje',
    titulek: 'Volná CNC fréza k dispozici',
    popis: 'Naše dílna má k dispozici volnou kapacitu 3osé CNC frézy. Rádi nabídneme výrobu menších sérií.',
  },
  {
    id: '2',
    typ: 'Prostory',
    titulek: 'Sdílený sklad k pronájmu',
    popis: 'Nabízíme 50 m² skladu v centru Brna za zvýhodněnou cenu. Vhodné pro menší e-shop.',
  },
  {
    id: '3',
    typ: 'Know-how',
    titulek: 'Mentoring v oblasti automatizace',
    popis: 'Náš specialista nabízí konzultace v oblasti průmyslové automatizace a IoT.',
  },
];

export default function NabidkaPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-6">Nabídky</h1>
      <div className="grid gap-4">
        {nabidky.map((nabidka) => (
          <Link
            key={nabidka.id}
            href={`/nabidka/${nabidka.id}`}
            className="block border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-white"
          >
            <p className="text-sm text-teal-600 font-medium mb-1">{nabidka.typ}</p>
            <h2 className="text-xl font-bold mb-2">{nabidka.titulek}</h2>
            <p className="text-gray-700">{nabidka.popis}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
