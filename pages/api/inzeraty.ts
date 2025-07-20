// pages/api/inzeraty.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const inzeraty = await prisma.inzerat.findMany({
      include: { fotky: true, autor: true },
    });
    res.status(200).json(inzeraty);
  }
}
