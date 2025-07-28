import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { prisma } from '../../../lib/prisma';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(200).json({ favoriteIds: [] });
  }

  const userWithFavorites = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { oblibene: { select: { id: true } } },
  });

  const favoriteIds = userWithFavorites?.oblibene.map(item => item.id) || [];
  res.status(200).json({ favoriteIds });
}