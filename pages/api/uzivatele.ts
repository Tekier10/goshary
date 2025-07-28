// pages/api/uzivatele.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: `Metoda ${req.method} není podporována.` });
  }

  try {
    const uzivatele = await prisma.uzivatel.findMany({
      select: {
        id: true,
        jmeno: true,
      },
    });

    res.status(200).json(uzivatele);
  } catch (error) {
    console.error('❌ Chyba při načítání uživatelů:', error);
    res.status(500).json({ error: 'Chyba při načítání uživatelů' });
  }
}
