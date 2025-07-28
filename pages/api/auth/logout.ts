// pages/api/auth/logout.ts
import { NextApiResponse, NextApiRequest } from 'next';
import cookie from 'cookie';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Smažeme cookie tím, že nastavíme její platnost do minulosti
  res.setHeader('Set-Cookie', cookie.serialize('authToken', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    expires: new Date(0),
    path: '/',
    sameSite: 'strict',
  }));
  res.status(200).json({ message: 'Odhlášení úspěšné' });
}
