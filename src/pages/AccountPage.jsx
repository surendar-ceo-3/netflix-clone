import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';

const AccountPage = () => {
  const { user, logout } = useAuth();

  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto px-8 pt-24 pb-16">
        <h1 className="text-white text-3xl font-bold mb-8">Account Settings</h1>
        
        <div className="bg-zinc-900 rounded-lg p-8 space-y-6">
          <div className="flex justify-between items-center py-3 border-b border-gray-800">
            <span className="text-gray-400">Membership & Billing</span>
            <button className="text-white bg-red-600 px-4 py-2 rounded hover:bg-red-700">
              Cancel Membership
            </button>
          </div>
          
          <div className="flex justify-between items-center py-3 border-b border-gray-800">
            <span className="text-gray-400">Plan Details</span>
            <span className="text-white">Premium 4K + HDR</span>
          </div>
          
          <div className="flex justify-between items-center py-3 border-b border-gray-800">
            <span className="text-gray-400">Email</span>
            <span className="text-white">{user?.email}</span>
          </div>
          
          <button 
            onClick={logout}
            className="w-full bg-red-600 text-white py-3 rounded hover:bg-red-700 mt-4"
          >
            Sign Out
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AccountPage;