import { NextApiRequest, NextApiResponse } from 'next';
import {dbConnect} from '../../utils/dbConnect';
import User from '../../models/User';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    console.log(email , password) ; 

    try {
      await dbConnect();

      // Check if the username already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
      }

      // Create a new user
      const newUser = new User({ "email" :  email, "password" : password });
      await newUser.save();

      // Create JWT token
      let JWT_SECRET = "srh"  ; 
      const token = jwt.sign({ email}, JWT_SECRET, { expiresIn: '1h' });

      // Set token in a cookie
      res.setHeader('Set-Cookie', cookie.serialize('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 3600, // 1 hour (in seconds)
        path: '/',
      }));

      return res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
};

export default handler;
