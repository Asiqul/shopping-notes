import { NextApiRequest, NextApiResponse } from 'next';
import type { Users } from '@prisma/client';
import { PrismaClient } from '@prisma/client';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const login: Users = req.body;
      const { email, password } = login;
      const user = await prisma.users.findFirst({
        where: {
          email,
        },
      });

      if (!user) {
        return res.status(400).json({
          status: 'Bad Request',
          message: 'Email belum terdaftar',
        });
      }

      const { id, name } = user;
      const checkPassword = await bcrypt.compare(password, user.password);

      if (!checkPassword) {
        return res.status(400).json({
          status: 'Bad Request',
          message: 'Password tidak sesuai',
        });
      }

      const tokenKey = process.env.TOKEN_KEY;
      const token: string = jwt.sign(
        {
          id,
          name,
        },
        tokenKey,
        {
          expiresIn: '1d',
        }
      );
      await prisma.users.update({
        where: {
          id,
        },
        data: {
          token,
        },
      });

      res.status(200).json({
        status: 'OK',
        message: 'User logged in',
        token,
      });
    } catch (error) {
      return error;
    }
  } else {
    return res.status(405).json({ status: 'Method Not Allowed', message: 'Method Not Allowed' });
  }
}
