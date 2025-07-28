import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { prisma } from '../../../lib/prisma';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  // Zkontrolujeme, zda je uživatel přihlášen
  if (!session) {
    return res.status(401).json({ message: 'Nejste přihlášen.' });
  }

  // Povolíme pouze metodu PUT
  if (req.method !== 'PUT') {
    return res.status(405).end();
  }

  try {
    const { name } = req.body;
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return res.status(400).json({ message: 'Jméno je povinné.' });
    }

    // Aktualizujeme jméno v databázi pro aktuálně přihlášeného uživatele
    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: { jmeno: name.trim() },
    });

    res.status(200).json({ message: 'Jméno bylo úspěšně změněno.', user: updatedUser });

  } catch (error) {
    console.error('Chyba při změně jména:', error);
    res.status(500).json({ message: 'Interní chyba serveru.' });
  }
}
