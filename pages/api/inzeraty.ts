import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';
import { prisma } from '../../lib/prisma';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  // --- ZÍSKÁNÍ SEZNAMU INZERÁTŮ ---
  if (req.method === 'GET') {
    const { typStranky } = req.query;
    try {
      const inzeraty = await prisma.inzerat.findMany({
        where: {
          typStranky: typStranky as string,
        },
        include: {
          fotky: true,
          autor: true,
        },
      });
      return res.status(200).json(inzeraty);
    } catch (error) {
      console.error('❌ Chyba při GET /api/inzeraty:', error);
      return res.status(500).json({ message: 'Chyba při načítání inzerátů' });
    }
  }

  // --- VYTVOŘENÍ NOVÉHO INZERÁTU ---
  if (req.method === 'POST') {
    const session = await getServerSession(req, res, authOptions);

    // 1. Zkontrolujeme, zda je uživatel přihlášen
    if (!session) {
      return res.status(401).json({ message: 'Pro vytvoření inzerátu musíte být přihlášen.' });
    }

    try {
      const { typStranky, titulek, popis, typ, lokalita, kontakt, fotky } = req.body;

      const inzerat = await prisma.inzerat.create({
        data: {
          typStranky,
          titulek,
          popis,
          typ,
          lokalita,
          kontakt,
          // 2. Propojíme inzerát s přihlášeným uživatelem BEZPEČNĚ
          autor: {
            connect: { id: session.user.id },
          },
          fotky: {
            create: fotky?.map((url: string) => ({ url })) || [],
          },
        },
      });

      return res.status(201).json(inzerat);

    } catch (error) {
      console.error('❌ Chyba při POST /api/inzeraty:', error);
      return res.status(500).json({ message: 'Interní chyba serveru.' });
    }
  }

  // Pokud je metoda jiná než GET nebo POST
  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).end(`Metoda ${req.method} není povolena`);
}