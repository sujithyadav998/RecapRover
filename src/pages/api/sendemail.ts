// import type { NextApiRequest, NextApiResponse } from 'next';
// import dbConnect from '../../utils/dbConnect';
// import Note, { NoteModel } from '../../models/Note';
// import transporter from '../../utils/emailService';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'GET') {
//     try {
//       await dbConnect(); // Connect to MongoDB

//       // Fetch a random note from MongoDB
//       const randomNote : any = await Note.aggregate([{ $sample: { size: 1 } }]);

//       if (!randomNote) {
//         return res.status(404).json({ success: false, message: 'No notes found' });
//       }

//       // Send an email with the note content
//       const mailOptions = {
//         from: 'sujithyadav123456@gmail.com',
//         to: '20eg106120@anurag.edu.in',
//         subject: 'Daily Random Note',
//         text: `Date: ${randomNote.date}\nContent: ${randomNote.content}`,
//       };

//       await transporter.sendMail(mailOptions);

//       res.status(200).json({ success: true, data: randomNote });
//     } catch (error) {
//       res.status(500).json({ success: false, error: 'Server Error' });
//     }
//   } else {
//     res.status(405).json({ success: false, error: 'Method Not Allowed' });
//   }
// }
