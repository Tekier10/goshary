// pages/api/oblibene.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';
import { prisma } from '../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (!session || !session.user?.id) {
    return res.status(401).json({ message: 'Nepřihlášený uživatel' });
  }

  const uzivatelId = session.user.id;
  const { inzeratId } = req.body;

  if (req.method === 'POST') {
    try {
      await prisma.user.update({
        where: { id: uzivatelId },
        data: {
          oblibene: {
            connect: { id: inzeratId },
          },
        },
      });

      const inzerat = await prisma.inzerat.findUnique({
        where: { id: inzeratId },
        include: { autor: true },
      });

      if (inzerat?.autorId && inzerat.autorId !== uzivatelId) {
        await prisma.notifikace.create({
          data: {
            zprava: `Vaše ${inzerat.typStranky} "${inzerat.titulek}" byla označena jako oblíbená.`,
            datum: new Date(),
            precteno: false,
            uzivatel: {
              connect: { id: inzerat.autorId },
            },
          },
        });
      }

      return res.status(200).json({ message: 'Inzerát označen jako oblíbený' });
    } catch (error) {
      console.error('Chyba při přidávání do oblíbených:', error);
      return res.status(500).json({ message: 'Interní chyba serveru' });
    }
  }

  return res.status(405).json({ message: 'Nepodporovaná metoda' });
}
