import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const uzivatel = await prisma.uzivatel.upsert({
    where: { email: 'test@goshary.cz' },
    update: {},
    create: {
      jmeno: 'Testovací Uživatel',
      email: 'test@goshary.cz',
    },
  });

  // NABÍDKA
  const nabidka = await prisma.inzerat.create({
    data: {
      typStranky: 'nabidka',
      typ: 'Stroje',
      titulek: 'Pronájem 3D tiskárny',
      popis: 'Nabízím zapůjčení kvalitní 3D tiskárny na víkend.',
      lokalita: 'Praha',
      kontakt: 'test@goshary.cz',
      overeno: true,
      hodnoceni: 4.8,
      autorId: uzivatel.id,
      fotky: {
        create: [
          {
            url: 'https://placehold.co/600x400?text=3D+tiskarna',
          },
        ],
      },
    },
  });

  // POPTÁVKA
  const poptavka = await prisma.inzerat.create({
    data: {
      typStranky: 'poptavka',
      typ: 'Služby',
      titulek: 'Hledáme svářečku',
      popis: 'Sháníme malou svářečku pro víkendovou práci.',
      lokalita: 'Brno',
      kontakt: 'test@goshary.cz',
      overeno: false,
      hodnoceni: 0,
      autorId: uzivatel.id,
      fotky: {
        create: [
          {
            url: 'https://placehold.co/600x400?text=Sv%C3%A1%C5%99e%C4%8Dka',
          },
        ],
      },
    },
  });

  console.log('✅ Seed hotov:', {
    nabidka: nabidka.titulek,
    poptavka: poptavka.titulek,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
