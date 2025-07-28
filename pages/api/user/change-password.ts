import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { prisma } from '../../../lib/prisma';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: 'Nejste přihlášen.' });
  }

  if (req.method !== 'PUT') {
    return res.status(405).end();
  }

  try {
    const { currentPassword, newPassword } = req.body;

    // 1. Validace vstupů
    if (!currentPassword || !newPassword || newPassword.length < 6) {
      return res.status(400).json({ message: 'Všechna pole jsou povinná a nové heslo musí mít alespoň 6 znaků.' });
    }

    // 2. Najdeme uživatele v DB, včetně jeho hashe hesla
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user || !user.passwordHash) {
      // Toto by se nemělo stát pro uživatele přihlášené přes heslo
      return res.status(400).json({ message: 'Uživatel nemá nastavené heslo.' });
    }

    // 3. Ověříme, zda se stávající heslo shoduje
    const passwordMatches = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!passwordMatches) {
      return res.status(401).json({ message: 'Současné heslo není správné.' });
    }

    // 4. Zahashujeme a uložíme nové heslo
    const newHashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);
    await prisma.user.update({
      where: { id: user.id },
      data: { passwordHash: newHashedPassword },
    });

    res.status(200).json({ message: 'Heslo bylo úspěšně změněno.' });

  } catch (error) {
    console.error('Chyba při změně hesla:', error);
    res.status(500).json({ message: 'Interní chyba serveru.' });
  }
}
