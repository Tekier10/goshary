import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { prisma } from '../../../lib/prisma';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Metoda ${req.method} není povolena`);
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ message: 'Nejste přihlášen.' });
  }

  try {
    const { inzeratId } = req.body;
    if (!inzeratId) {
      return res.status(400).json({ message: 'Chybí ID inzerátu.' });
    }

    const userId = session.user.id;

    // Zjistíme, zda uživatel již má tento inzerát v oblíbených
    const existingFavorite = await prisma.user.findFirst({
      where: {
        id: userId,
        oblibene: { some: { id: inzeratId } },
      },
    });

    if (existingFavorite) {
      // Pokud ano, ODEBEREME ho z oblíbených
      await prisma.user.update({
        where: { id: userId },
        data: {
          oblibene: { disconnect: { id: inzeratId } },
        },
      });
      return res.status(200).json({ message: 'Odebráno z oblíbených', action: 'removed' });
    } else {
      // Pokud ne, PŘIDÁME ho do oblíbených
      await prisma.user.update({
        where: { id: userId },
        data: {
          oblibene: { connect: { id: inzeratId } },
        },
      });
      return res.status(200).json({ message: 'Přidáno do oblíbených', action: 'added' });
    }
  } catch (error) {
    console.error('Chyba při přepínání oblíbených:', error);
    return res.status(500).json({ message: 'Interní chyba serveru' });
  }
}