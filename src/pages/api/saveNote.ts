import type { NextApiRequest, NextApiResponse } from 'next';
import {dbConnect} from '../../utils/dbConnect';
import Note, { NoteModel } from '../../models/Note';
import transporter from '../../utils/emailService';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      await dbConnect(); // Connect to MongoDB

      const { date, content } = req.body;

      const newNote: NoteModel = new Note({
        date,
        content,
      });

      const savedNote = await newNote.save();
      const randomNote : any = await Note.aggregate([{ $sample: { size: 1 } }]);
      console.log(randomNote, randomNote[0].date , randomNote[0].content)

      if (!randomNote) {
        return res.status(404).json({ success: false, message: 'No notes found' });
      }

      // Send an email with the note content
      const mailOptions = {
        from: 'sanjay809697@gmail.com',
        to: '20eg106120@anurag.edu.in',
        subject: 'Daily Random Note',
        text: `Date: ${randomNote[0].date}\nContent: ${randomNote[0].content}`,
      };

      await transporter.sendMail(mailOptions);
      res.status(201).json({ success: true, data: savedNote });
    } catch (error) {
      console.log(error)
      res.status(500).json({ success: false, error: 'Server Error' });
    }
  } else {
    res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }
}
