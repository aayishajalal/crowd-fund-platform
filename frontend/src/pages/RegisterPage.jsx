import React, { useState } from 'react';
import { registerUser } from '../services/apiService';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [user, setUser] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(user);
      alert('Registration successful!');
      navigate('/login'); // Navigate to login page after successful registration
    } catch (error) {
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form 
        onSubmit={handleSubmit} 
        className="p-8 bg-white rounded-lg shadow-md w-96"
      >
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">Register</h2>
        <input 
          type="text" 
          name="name" 
          placeholder="Full Name" 
          value={user.name}
          onChange={handleChange} 
          className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          value={user.email}
          onChange={handleChange} 
          className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          value={user.password}
          onChange={handleChange} 
          className="w-full p-3 mb-6 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <button 
          type="submit" 
          className="w-full py-3 text-white bg-indigo-500 rounded-lg hover:bg-indigo-600"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
