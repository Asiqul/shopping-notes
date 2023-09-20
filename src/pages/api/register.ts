import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { name, email, password }: { name: string; email: string; password: string } = req.body;
      const userName = name.charAt(0).toUpperCase() + name.slice(1);
      const checkEmail = await prisma.users.findFirst({
        where: {
          email,
        },
      });
      if (checkEmail) {
        return res.status(400).json({
          status: 'Bad Request',
          message: 'Email sudah terdaftar',
        });
      }
      const saltRounds: Number = 5;
      bcrypt.genSalt(saltRounds, (error: Error, salt: string) => {
        bcrypt.hash(password, salt, async (error: Error, hashPassword: string) => {
          await prisma.users.create({
            data: {
              name: userName,
              email,
              password: hashPassword,
            },
          });
          return res.status(200).json({
            status: 'OK',
            message: 'New user created',
          });
        });
      });
    } catch (error) {
      return error;
    }
  } else {
    return res.status(405).json({ status: 'Method Not Allowed', message: 'Method Not Allowed' });
  }
}
