import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const API_URL = 'https://netflix-clone-pi-olive.vercel.app';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password
      });
      
      if (response.data.success) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        navigate('/browse');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-red-600">NETFLIX</h1>
          <p className="text-gray-400 mt-2">Clone Project by <span className="text-red-500">Surendar</span></p>
        </div>

        <div className="bg-zinc-900 p-8 rounded-lg">
          <h2 className="text-3xl text-white font-medium mb-6">Sign In</h2>
          
          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-800 text-white rounded focus:border-red-600 focus:outline-none"
                disabled={loading}
                required
              />
            </div>

            <div className="mb-6">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-800 text-white rounded focus:border-red-600 focus:outline-none"
                disabled={loading}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 rounded transition disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-4 text-center text-gray-400">
            <span>New to Netflix? </span>
            <Link to="/signup" className="text-white hover:underline">
              Sign up now
            </Link>
          </div>
          
          <div className="mt-4 text-center text-xs text-gray-500">
            <p>Test: test@example.com / password123</p>
            <p className="mt-1">Created by <span className="text-red-500">Surendar</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;