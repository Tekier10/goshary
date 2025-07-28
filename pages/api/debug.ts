import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const user = await prisma.user.findUnique({
      where: { email: 'test@goshary.cz' },
    });

    if (!user) {
      return res.status(404).json({ error: 'Uživatel nenalezen' });
    }

    const notifikace = await prisma.notifikace.create({
      data: {
        prijemceId: user.id,
        zprava: 'Toto je testovací notifikace 🔔',
        datum: new Date(),
        precteno: false,
      },
    });

    return res.status(200).json({ zprava: 'Notifikace vytvořena', notifikace });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Chyba při vytváření notifikace' });
  }
}
