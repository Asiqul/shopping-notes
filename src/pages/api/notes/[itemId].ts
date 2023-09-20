import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req: any, res: any) {
  if (req.method === 'DELETE') {
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader && authHeader.split(' ')[1];
      const user = await prisma.users.findFirst({
        where: {
          token,
        },
      });

      if (!user) {
        return res.status(404).json({ status: 'Not Found', message: 'User Not Found' });
      } else {
        await prisma.note.delete({
          where: {
            usersId: user.id,
            id: Number(req.query.itemId),
          },
        });
        return res.status(200).json({ status: 'OK', message: 'User logged out' });
      }
    } catch (error) {}
  }
}
