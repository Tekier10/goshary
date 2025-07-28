import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { prisma } from '../../../lib/prisma';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: 'Nejste přihlášen.' });
  }

  if (req.method === 'GET') {
    try {
      const ads = await prisma.inzerat.findMany({
        where: {
          autorId: session.user.id, // Klíčový filtr: pouze inzeráty přihlášeného uživatele
        },
        orderBy: {
          // Můžeme přidat pole createdAt do Inzerat modelu pro řazení
          // prozatím necháme bez řazení
        },
      });
      return res.status(200).json(ads);
    } catch (error) {
      return res.status(500).json({ message: 'Chyba serveru' });
    }
  }

  res.setHeader('Allow', ['GET']);
  res.status(405).end(`Metoda ${req.method} není povolena`);
}
