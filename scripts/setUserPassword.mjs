import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const SALT_ROUNDS = 10;

async function setUserPassword() {
  console.log('Spouštím skript pro nastavení hesla...');

  const userEmail = 'test@goshary.cz';
  const plainTextPassword = 'Heslo123'; // Zvolte si bezpečné dočasné heslo

  try {
    const hashedPassword = await bcrypt.hash(plainTextPassword, SALT_ROUNDS);
    
    const updatedUser = await prisma.uzivatel.update({
      where: {
        email: userEmail,
      },
      data: {
        passwordHash: hashedPassword,
      },
    });

    console.log(`✅ Heslo pro ${updatedUser.email} bylo úspěšně nastaveno.`);
  } catch (error) {
    console.error('❌ Došlo k chybě:', error);
  } finally {
    await prisma.$disconnect();
    console.log('Spojení s databází ukončeno.');
  }
}

setUserPassword();
