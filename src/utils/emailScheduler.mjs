// utils/emailScheduler.ts

//import cron from 'node-cron';
import axios from 'axios';

const sendEmail = async () => {
  try {
    const response = await axios.post('http://localhost:3001/api/saveNote');
    console.log('Email sent:', response.data);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

// Schedule the email sending daily at 6 AM
sendEmail()
// cron.schedule('0 6 * * *', () => {
//   sendEmail();
// });
