// pages/api/auth/me.ts
// (Příklad - upravte podle vaší logiky pro verifikaci tokenu/session)
import { NextApiRequest, NextApiResponse } from 'next';
import { verifyUserFromCookie } from '../../../lib/auth'; // Vaše pomocná funkce

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const user = await verifyUserFromCookie(req); // Zde dekódujete token z cookie
    if (!user) {
      return res.status(401).json({ message: 'Neautorizovaný přístup' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Interní chyba serveru' });
  }
}
