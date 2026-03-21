import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const NotFoundPage = () => {
  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
        <h1 className="text-9xl font-bold text-red-600">404</h1>
        <h2 className="text-3xl text-white mt-4 mb-2">Lost in the Multiverse?</h2>
        <p className="text-gray-400 mb-8 max-w-md">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex gap-4">
          <Link 
            to="/browse" 
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded font-semibold transition"
          >
            🎬 Back to Home
          </Link>
          <Link 
            to="/" 
            className="border border-gray-600 hover:border-red-600 text-white px-6 py-3 rounded font-semibold transition"
          >
            🔄 Try Again
          </Link>
        </div>
        <p className="text-gray-500 text-sm mt-8">
          Built by <span className="text-red-500">Surendar</span> | Netflix Clone Project
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default NotFoundPage;