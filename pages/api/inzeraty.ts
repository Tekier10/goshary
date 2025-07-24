import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { typStranky } = req.query;
    console.log('🔍 API dotaz /api/inzeraty, typStranky =', typStranky);

    try {
      const inzeraty = await prisma.inzerat.findMany({
        where: {
          typStranky: typStranky as string,
        },
        include: {
          fotky: true,
          autor: true,
        },
      });
      console.log('➡️ Vráceno inzerátů:', inzeraty.length);
      res.status(200).json(inzeraty);
    } catch (error) {
      console.error('❌ Chyba při GET /api/inzeraty:', error);
      res.status(500).json({ error: 'Chyba serveru' });
    }
  }

  if (req.method === 'POST') {
    const body = req.body;
    console.log('📥 Přijatý inzerát:', body);

    try {
      const inzerat = await prisma.inzerat.create({
        data: {
          typStranky: body.typStranky,
          typ: body.typ,
          titulek: body.titulek,
          popis: body.popis,
          lokalita: body.lokalita,
          kontakt: body.kontakt,
          autorId: body.autorId,
          overeno: false,
          hodnoceni: 0,
          fotky: {
            create: body.fotky?.map((url: string) => ({ url })) || [],
          },
        },
        include: {
          fotky: true,
          autor: true,
        },
      });

      console.log('✅ Uložený inzerát:', inzerat);
      res.status(200).json(inzerat);
    } catch (error) {
      console.error('❌ Chyba při POST /api/inzeraty:', error);
      res.status(500).json({ error: 'Chyba serveru' });
    }
  }
}
