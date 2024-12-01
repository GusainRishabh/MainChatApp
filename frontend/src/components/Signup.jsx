import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { BASE_URL } from '..';

const Signup = () => {
  const [user, setUser] = useState({
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    gender: '',
  });
  const navigate = useNavigate();

  const handleCheckbox = (gender) => {
    setUser({ ...user, gender });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/user/register`, user, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate('/login');
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
      console.error(error);
    }
  };

  return (
      <div className="w-full max-w-4xl flex shadow-lg rounded-xl overflow-hidden">
        {/* Left Pane: Sign In Prompt */}
        <div className="w-1/2 bg-gradient-to-r from-blue-500 to-blue-600 text-white flex flex-col justify-center items-center p-8">
          <h1 className="text-3xl font-bold mb-4">Welcome Back!</h1>
          <p className="mb-6 text-center">Enter your personal details to use all of our site's features.</p>
          <Link
            to="/login"
            className="px-6 py-2 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-100 transition"
          >
            Sign In
          </Link>
        </div>

        {/* Right Pane: Signup Form */}
        <div className="w-1/2 bg-white p-8">
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">Create Your Account</h1>
          <form onSubmit={onSubmitHandler} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                placeholder="Full Name"
                value={user.fullName}
                onChange={(e) => setUser({ ...user, fullName: e.target.value })}
                className="w-full px-4 py-2 mt-1 bg-gray-50 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                placeholder="Username"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                className="w-full px-4 py-2 mt-1 bg-gray-50 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                placeholder="Password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                className="w-full px-4 py-2 mt-1 bg-gray-50 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm Password"
                value={user.confirmPassword}
                onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
                className="w-full px-4 py-2 mt-1 bg-gray-50 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Gender</label>
              <div className="flex items-center space-x-4 mt-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={user.gender === 'male'}
                    onChange={() => handleCheckbox('male')}
                    className="form-checkbox h-5 w-5 text-blue-500 rounded"
                  />
                  <span>Male</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={user.gender === 'female'}
                    onChange={() => handleCheckbox('female')}
                    className="form-checkbox h-5 w-5 text-blue-500 rounded"
                  />
                  <span>Female</span>
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium py-2.5 rounded-lg hover:from-blue-600 hover:to-blue-700 focus:ring-4 focus:ring-blue-300 transition duration-300"
            >
              Sign Up
            </button>
          </form>
          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-500 font-medium hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
  );
};

export default Signup;
