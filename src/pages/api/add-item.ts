import { NextApiRequest, NextApiResponse } from 'next';
import type { Note } from '@prisma/client';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const note: Note = req.body;
      let { item_name, quantity } = note;
      item_name = item_name.charAt(0).toUpperCase() + item_name.slice(1);
      console.log(item_name);
      const authHeader = req.headers.authorization;
      const token = authHeader && authHeader.split(' ')[1];
      const user = await prisma.users.findFirst({
        where: {
          token,
        },
      });

      if (!token || !user || !item_name || !quantity) {
        return res.status(400).json({ status: 'Bad Request', message: 'Request error' });
      } else {
        const checkItem = await prisma.note.findFirst({
          where: {
            usersId: user.id,
            item_name,
          },
        });

        if (!checkItem) {
          await prisma.note.create({
            data: {
              item_name,
              quantity,
              usersId: user.id,
            },
          });
          return res.status(200).json({ status: 'OK', message: 'New item created' });
        } else {
          let newQuantity = checkItem.quantity + quantity;
          await prisma.note.update({
            where: {
              id: checkItem.id,
            },
            data: {
              quantity: newQuantity,
            },
          });
          return res.status(200).json({ status: 'OK', message: 'Item Updated' });
        }
      }
    } catch (error) {
      return res.status(500).json({ status: 'Internal Server Error', message: 'Internal Server Error' });
    }
  } else {
    return res.status(405).json({ status: 'Method Not Allowed', message: 'Method Not Allowed' });
  }
}
