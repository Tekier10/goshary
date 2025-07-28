import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

const SALT_ROUNDS = 10;

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Metoda není povolena' });
  }

  try {
    const { token, password } = req.body;

    // 1. Validace vstupů
    if (!token || !password || password.length < 6) {
      return res.status(400).json({ message: 'Token a heslo (min. 6 znaků) jsou povinné.' });
    }

    // 2. Najdeme token v databázi (musíme ho zahashovat, abychom našli shodu)
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { token: hashedToken },
    });

    // 3. Ověříme platnost tokenu
    if (!resetToken) {
      return res.status(400).json({ message: 'Neplatný token pro obnovu.' });
    }
    if (new Date() > resetToken.expires) {
      return res.status(400).json({ message: 'Platnost tokenu vypršela.' });
    }

    // 4. Zahashujeme nové heslo
    const newHashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // 5. Aktualizujeme heslo uživatele a smažeme použitý token v jedné transakci
    await prisma.$transaction([
      prisma.user.update({
        where: { id: resetToken.uzivatelId },
        data: { passwordHash: newHashedPassword },
      }),
      prisma.passwordResetToken.delete({
        where: { id: resetToken.id },
      }),
    ]);

    res.status(200).json({ message: 'Heslo bylo úspěšně změněno.' });

  } catch (error) {
    console.error('Chyba při obnově hesla:', error);
    res.status(500).json({ message: 'Interní chyba serveru.' });
  }
}
