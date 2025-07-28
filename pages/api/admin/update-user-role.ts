import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { prisma } from '../../../lib/prisma';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  // 1. Ověříme, zda je žádost odeslána adminem
  if (!session || session.user?.role !== 'ADMIN') {
    return res.status(403).json({ message: 'Přístup odepřen.' });
  }

  // Povolíme pouze metodu PUT
  if (req.method !== 'PUT') {
    return res.status(405).end();
  }

  try {
    const { userId, newRole } = req.body;

    // 2. Validace vstupních dat
    if (!userId || !newRole || !['USER', 'ADMIN'].includes(newRole)) {
      return res.status(400).json({ message: 'Neplatná žádost.' });
    }
    
    // 3. Bezpečnostní pojistka: Zabráníme adminovi, aby si odebral vlastní admin roli
    if (session.user.id === userId && newRole === 'USER') {
      return res.status(400).json({ message: 'Nemůžete si odebrat vlastní administrátorská práva.' });
    }

    // 4. Aktualizujeme roli v databázi
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { role: newRole },
    });

    return res.status(200).json(updatedUser);

  } catch (error) {
    console.error('Chyba při změně role:', error);
    return res.status(500).json({ message: 'Interní chyba serveru.' });
  }
}
