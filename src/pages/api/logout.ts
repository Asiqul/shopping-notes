import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'DELETE') {
        try {
            const authHeader = req.headers.authorization;
            const token = authHeader && authHeader.split(' ')[1];

            if (!token) {
                return res.status(401).json({ status: 'Unauthorized', message: 'Token Invalid' });
            } else {
                const user = await prisma.users.findFirst({
                    where: {
                        token,
                    },
                });
                if (!user) {
                    return res.status(404).json({ status: 'Not Found', message: 'User Not Found' });
                } else {
                    await prisma.users.update({
                        where: {
                            id: user.id,
                        },
                        data: {
                            token: null,
                        },
                    });
                    return res.status(200).json({ status: 'OK', message: 'User logged out' });
                }
            }
        } catch (error) {
            return res.status(500).json({ status: 'Internal Server Error', message: 'Internal Server Error' });
        }
    } else {
        return res.status(405).json({ status: 'Method Not Allowed', message: 'Method Not Allowed' });
    }
}
