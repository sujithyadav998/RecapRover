import React, { useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
interface NoteFormData {
  date: string;
  notes: string;
}
import { GetServerSideProps } from 'next';
import { protectRoute } from '../middleware/auth'; 

interface ProtectedPageProps {
  session: any;
  // Other props if needed
}

const NoteForm: any = ({ session }: ProtectedPageProps) => {
  const [formData, setFormData] = useState<NoteFormData>({
    date: '',
    notes: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

  try {
    const response = await axios.post('/api/saveNote', {
      date: formData.date,
      content: formData.notes,
    });
    // await axios.get('/api/sendemail'
    //   );
    console.log('Note saved:', response.data);
    // Add any success message or redirect logic here
  } catch (error) {
    console.error('Error saving note:', error);
    // Handle error (show message or redirect to an error page)
  }
  };
  // const session = useSession() ; 
  // const router = useRouter() ;
  // if(!session.data)
  // {
  //    router.push('/');
  // }
  return (
   
    <form onSubmit={handleSubmit} style = {{ "height" : "100vh"}} className="max-w-md mx-auto mt-8">
      <div className="mb-4">
        <label htmlFor="date" className="block mb-2 text-gray-600">
         <b>  Date: </b>
        </label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-300"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="notes" className="block mb-2 text-gray-600">
         <b>  Notes:</b>
        </label>
        <textarea
          style={{"height" : "60vh"}}
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows={4}
          className="border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-300"
          required
        ></textarea>
      </div>
      <div  style = {{"height" : "5vh"}}className="flex justify-center  items-center h-screen">
        <button
          type="submit"
          style = {
            {
              "backgroundColor" : "black"  
             
            }
          }
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
        >
           <b> Submit </b>
        </button>
      </div>
    </form>
  );
};


export const getServerSideProps: any= async (context : any) => {
  return protectRoute(context);
};
export default NoteForm;
