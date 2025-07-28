import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { prisma } from '../../../lib/prisma';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const adId = String(id);
  const session = await getServerSession(req, res, authOptions);

  // --- GET: NAČTENÍ DETAILU INZERÁTU ---
  if (req.method === 'GET') {
    try {
      const inzerat = await prisma.inzerat.findUnique({
        where: { id: adId },
        include: {
          autor: {
            select: { name: true, image: true }, // Posíláme jen bezpečná data o autorovi
          },
          fotky: true,
        },
      });

      if (!inzerat) {
        return res.status(404).json({ message: 'Inzerát nebyl nalezen.' });
      }
      return res.status(200).json(inzerat);

    } catch (error) {
      return res.status(500).json({ message: 'Chyba serveru při načítání inzerátu.' });
    }
  }

  // --- PUT: ÚPRAVA INZERÁTU ---
  if (req.method === 'PUT') {
    if (!session) {
      return res.status(401).json({ message: 'Nejste přihlášen.' });
    }

    try {
      const inzeratToUpdate = await prisma.inzerat.findUnique({
        where: { id: adId },
      });

      if (!inzeratToUpdate) {
        return res.status(404).json({ message: 'Inzerát k úpravě nebyl nalezen.' });
      }

      // Bezpečnostní kontrola: Uživatel může upravit jen svůj inzerát (nebo je admin)
      if (inzeratToUpdate.autorId !== session.user.id && session.user.role !== 'ADMIN') {
        return res.status(403).json({ message: 'Nemáte oprávnění upravit tento inzerát.' });
      }

      const { body } = req;
      const updatedInzerat = await prisma.inzerat.update({
        where: { id: adId },
        data: {
          titulek: body.titulek,
          popis: body.popis,
          typ: body.typ,
          lokalita: body.lokalita,
          kontakt: body.kontakt,
        },
      });

      return res.status(200).json(updatedInzerat);

    } catch (error) {
      return res.status(500).json({ message: 'Chyba serveru při úpravě inzerátu.' });
    }
  }

  // --- DELETE: SMAZÁNÍ INZERÁTU ---
  if (req.method === 'DELETE') {
    if (!session) {
      return res.status(401).json({ message: 'Nejste přihlášen.' });
    }

    try {
      const inzeratToDelete = await prisma.inzerat.findUnique({
        where: { id: adId },
      });

      if (!inzeratToDelete) {
        return res.status(404).json({ message: 'Inzerát nebyl nalezen.' });
      }

      if (inzeratToDelete.autorId !== session.user.id && session.user.role !== 'ADMIN') {
        return res.status(403).json({ message: 'Nemáte oprávnění smazat tento inzerát.' });
      }

      await prisma.inzerat.delete({
        where: { id: adId },
      });

      return res.status(200).json({ message: 'Inzerát byl úspěšně smazán.' });

    } catch (error) {
      return res.status(500).json({ message: 'Chyba serveru při mazání inzerátu.' });
    }
  }

  res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
  res.status(405).end(`Metoda ${req.method} není povolena`);
}
