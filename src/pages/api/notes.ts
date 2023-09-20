import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (req.method === 'GET') {
    if (!token) {
      return res.status(401).json({ status: 'Unauthorized', message: 'Token Invalid' });
    }

    try {
      const user = await prisma.users.findFirst({
        where: {
          token,
        },
      });

      if (!user) {
        return res.status(404).json({ status: 'Not Found', message: 'User Not Found' });
      }

      const notes = await prisma.note.findMany({
        where: {
          usersId: user.id,
        },
      });
      return res.status(200).json(notes);
    } catch (error) {
      return res.status(500).json({ status: 'Internal Server Error', message: 'Internal Server Error' });
    }
  } else {
    return res.status(405).json({ status: 'Method Not Allowed', message: 'Method Not Allowed' });
  }
}
