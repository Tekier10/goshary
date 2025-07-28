// pages/api/notifikace.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';
import { prisma } from '../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user?.email) {
    return res.status(401).json({ message: 'Nepřihlášený uživatel' });
  }

  const user = await prisma.uzivatel.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return res.status(404).json({ message: 'Uživatel nenalezen' });
  }

  if (req.method === 'GET') {
    const notifikace = await prisma.notifikace.findMany({
      where: { prijemceId: user.id },
      orderBy: { datum: 'desc' },
    });
    return res.status(200).json(notifikace);
  }

  if (req.method === 'PATCH') {
    const { id } = req.body;

    try {
      if (id) {
        // Jednotlivá notifikace
        const updated = await prisma.notifikace.updateMany({
          where: {
            id,
            prijemceId: user.id,
          },
          data: {
            precteno: true,
          },
        });
        return res.status(200).json({ message: 'Notifikace označena jako přečtená', updated });
      } else {
        // Hromadně všechny notifikace
        const updated = await prisma.notifikace.updateMany({
          where: {
            prijemceId: user.id,
            precteno: false,
          },
          data: {
            precteno: true,
          },
        });
        return res.status(200).json({ message: 'Všechny notifikace označeny jako přečtené', updated });
      }
    } catch (err) {
      console.error('❌ Chyba při označení notifikací:', err);
      return res.status(500).json({ message: 'Chyba při označení notifikací' });
    }
  }

  return res.status(405).json({ message: 'Metoda není podporována' });
}
