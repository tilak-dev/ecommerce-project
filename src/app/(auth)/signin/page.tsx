"use client"
import React, { useState } from 'react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Login with:', email, password);
    // Add your authentication logic here
  };
  return (
    <div className="flex min-h-screen bg-gray-200 text-black">
      <div className="m-auto w-1/3 shadow-lg">
        <div className="bg-white p-8">
          <h2 className="text-center text-2xl mb-4">Login to Your Account</h2>
          <div className="flex justify-center space-x-4 mb-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-xl">F</button>
            <button className="bg-red-500 text-white px-4 py-2 rounded-xl">G+</button>
            <button className="bg-blue-700 text-white px-4 py-2 rounded-xl">in</button>
          </div>
          <p className="text-center mb-4">OR</p>
          <form onSubmit={handleLogin}>
            <input 
              type="email" 
              placeholder="Email" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              className="w-full p-2 mb-4 border rounded"
            />
            <input 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              className="w-full p-2 mb-4 border rounded"
            />
            <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">Sign In</button>
          </form>
        </div>
        <div className="bg-green-500 text-white p-4 text-center">
          <span>New Here? </span>
          <button className="underline">Sign Up</button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
