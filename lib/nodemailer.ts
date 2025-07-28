import nodemailer from 'nodemailer';

// Zde vložíte údaje z vašeho SMTP serveru (např. z Ethereal)
// DŮLEŽITÉ: V reálné aplikaci tyto údaje uložte do .env souboru!
const smtpConfig = {
  host: process.env.SMTP_HOST || 'smtp.ethereal.email',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER, // Váš SMTP uživatel
    pass: process.env.SMTP_PASS, // Vaše SMTP heslo
  },
};

export const transporter = nodemailer.createTransport(smtpConfig);
