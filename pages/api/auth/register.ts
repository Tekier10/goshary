import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';
import bcrypt from 'bcrypt';
import { transporter } from '../../../lib/nodemailer';
import crypto from 'crypto';

const SALT_ROUNDS = 10;

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end(`Metoda ${req.method} není povolena`);
  }

  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Všechny pole jsou povinná.' });
    }

    const existingUser = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
    if (existingUser) {
      return res.status(409).json({ message: 'Uživatel s tímto e-mailem již existuje.' });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await prisma.user.create({
      data: {
        name: name,
        email: email.toLowerCase(),
        passwordHash: hashedPassword,
      },
    });

    // --- NOVÁ ČÁST: VYTVOŘENÍ TOKENU A ODESLÁNÍ E-MAILU ---
    const token = crypto.randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 24 * 3600 * 1000); // Platnost 24 hodin

    // Použijeme existující model VerificationToken
    await prisma.verificationToken.create({
      data: {
        identifier: user.email!,
        token: token,
        expires,
      },
    });

    const verificationLink = `${process.env.NEXTAUTH_URL}/api/auth/verify-email?token=${token}`;

    await transporter.sendMail({
      from: '"GoShary" <noreply@goshary.cz>',
      to: user.email,
      subject: 'Ověřte prosím svou e-mailovou adresu',
      html: `
        <p>Dobrý den,</p>
        <p>děkujeme za registraci. Pro dokončení prosím ověřte svou e-mailovou adresu kliknutím na odkaz níže:</p>
        <a href="${verificationLink}">${verificationLink}</a>
        <p>Tento odkaz je platný 24 hodin.</p>
      `,
    });
    // --- KONEC NOVÉ ČÁSTI ---

    return res.status(201).json({ message: 'Registrace úspěšná. Ověřte prosím svůj e-mail.' });

  } catch (error) {
    console.error('Chyba při registraci:', error);
    return res.status(500).json({ message: 'Interní chyba serveru.' });
  }
}