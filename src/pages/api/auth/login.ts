import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { username, password } = req.body;


    if (username === 'admin' && password === 'password') {
    const secretKey = process.env.JWT_SECRET_KEY || 'default_secret';
    const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });

    return res.status(200).json({
        message: 'Login successful',
        token,
    });
    }

    res.status(401).json({ message: 'Invalid credentials' });
}
