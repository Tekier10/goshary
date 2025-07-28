import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  const { token } = req.query;
  if (typeof token !== 'string' || !token) {
    return res.status(400).send('Chybějící token.');
  }

  try {
    const verificationToken = await prisma.verificationToken.findFirst({
      where: { token: token },
    });

    if (!verificationToken) {
      return res.status(400).send('Neplatný ověřovací token.');
    }

    if (new Date() > verificationToken.expires) {
      return res.status(400).send('Platnost ověřovacího tokenu vypršela.');
    }

    // Aktualizujeme uživatele a smažeme token v jedné transakci
    await prisma.$transaction([
      prisma.user.update({
        where: { email: verificationToken.identifier },
        data: { emailVerified: new Date() },
      }),
      prisma.verificationToken.delete({
        where: { token: verificationToken.token },
      }),
    ]);
    
    // Přesměrujeme uživatele na stránku s potvrzením
    res.redirect('/overeno');

  } catch (error) {
    console.error('Chyba při ověřování e-mailu:', error);
    res.status(500).send('Interní chyba serveru.');
  }
}
