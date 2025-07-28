import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';
import { transporter } from '../../../lib/nodemailer';
import crypto from 'crypto';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Metoda není povolena' });
  }

  // Celou logiku obalíme do bloku try...catch, aby se předešlo pádům serveru
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'E-mail je povinný' });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (user) {
      const token = crypto.randomBytes(32).toString('hex');
      const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
      const expires = new Date(Date.now() + 3600 * 1000); // Platnost 1 hodina

      await prisma.passwordResetToken.create({
        data: {
          token: hashedToken,
          expires,
          uzivatelId: user.id,
        },
      });

      const resetLink = `${process.env.NEXTAUTH_URL}/obnovit-heslo?token=${token}`;

      // Odešleme e-mail
      await transporter.sendMail({
        from: '"GoShary" <noreply@goshary.cz>',
        to: user.email,
        subject: 'Obnova hesla pro váš účet',
        html: `<p>Pro nastavení nového hesla klikněte na následující odkaz: <a href="${resetLink}">${resetLink}</a></p>`,
      });
    }

    // Ať už uživatel existuje nebo ne, vrátíme stejnou úspěšnou odpověď
    res.status(200).json({ message: 'Pokud váš e-mail existuje v naší databázi, byl vám odeslán odkaz pro obnovu hesla.' });

  } catch (error) {
    // Pokud nastane jakákoliv chyba (DB, SMTP, ...), zalogujeme ji
    console.error('CHYBA V API pro obnovu hesla:', error); 
    // A pošleme na frontend obecnou chybu ve formátu JSON
    res.status(500).json({ message: 'Interní chyba serveru. Zkuste to prosím později.' });
  }
}
