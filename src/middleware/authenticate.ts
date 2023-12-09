import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';

const SECRET_KEY = 'your-secret-key'; // Replace with your own secret key

export const authenticate = (handler: any) => async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Get the token from the cookie
    const cookies = cookie.parse(req.headers.cookie || '');
    const token = cookies.token;

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized - No token provided' });
    }

    // Verify token
    jwt.verify(token, SECRET_KEY, (err: any, decoded: any) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized - Invalid token' });
      }

      // Set decoded data in the request for future use
      req.body.user = decoded;

      return handler(req, res);
    });
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
