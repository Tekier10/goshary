import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]'; // Cesta k vaší konfiguraci next-auth
import { prisma } from '../../../lib/prisma';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  // Získáme session na straně serveru
  const session = await getServerSession(req, res, authOptions);

  // 1. Ověříme, zda je uživatel přihlášen a má roli ADMIN
  if (!session || session.user?.role !== 'ADMIN') {
    return res.status(403).json({ message: 'Přístup odepřen.' });
  }

  // Povolíme pouze metodu GET
  if (req.method === 'GET') {
    try {
      // 2. Získáme všechny uživatele z databáze
      const users = await prisma.user.findMany({
        // Seřadíme je například podle data registrace nebo jména
        orderBy: {
          name: 'asc',
        },
        // Vybereme jen ta pole, která potřebujeme, nikdy neposíláme hash hesla!
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      });
      return res.status(200).json(users);
    } catch (error) {
      console.error('Chyba při načítání uživatelů:', error);
      return res.status(500).json({ message: 'Interní chyba serveru.' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Metoda ${req.method} není povolena`);
  }
}
