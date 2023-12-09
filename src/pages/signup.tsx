import { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('/api/signup', { "email" :  email, "password" : password });
      console.log('Signup successful:', response.data);
      // Redirect user or perform necessary actions upon successful signup
    } catch (error) {
      console.error('Signup error:', error);
      // Handle signup error (display error message, etc.)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-80">
        <h1 className="text-2xl font-bold mb-6">Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border-gray-300 rounded-md p-2" required />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border-gray-300 rounded-md p-2" required />
          </div>
          <button type="submit" className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600">Sign Up</button>
        </form>
        <p className="mt-4">Already have an account? <Link legacyBehavior href="/login"><a className="text-blue-500">Login</a></Link></p>
      </div>
    </div>
  );
};

export default Signup;
