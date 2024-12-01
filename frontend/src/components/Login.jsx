import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setAuthUser } from '../redux/userSlice';
import { BASE_URL } from '..';

const Login = () => {
  const [user, setUser] = useState({ username: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/user/login`, user, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      dispatch(setAuthUser(res.data));
      toast.success('Login successful!');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    }
    setUser({ username: '', password: '' });
  };

  return (
    <div className="w-full max-w-4xl flex shadow-lg rounded-lg overflow-hidden">
      {/* Left Pane: Sign In Section */}
      <div className="w-1/2 bg-white p-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Sign In</h2>
        <p className="text-sm text-gray-600 mb-6">Use your username and password to sign in</p>
        <form onSubmit={onSubmitHandler} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Enter your username"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="flex justify-between items-center">
            <Link to="/forgot-password" className="text-sm text-blue-500 hover:underline">
              Forgot Password?
            </Link>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition"
          >
            Sign In
          </button>
        </form>
        <p className="text-sm font-light text-gray-600 mt-6">
          Don’t have an account?{' '}
          <Link to="/signup" className="font-medium text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>

      {/* Right Pane: Registration Call-to-Action */}
      <div className="w-1/2 bg-gradient-to-r from-blue-500 to-blue-600 text-white p-8 flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold mb-4">Hello, Friend!</h2>
        <p className="text-center mb-6">Register now to explore all our features.</p>
        <Link
          to="/signup"
          className="px-6 py-2 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-100 transition"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Login;
