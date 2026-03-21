import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto px-8 pt-24 pb-16">
        <h1 className="text-white text-3xl font-bold mb-8">My Profile</h1>
        
        <div className="bg-zinc-900 rounded-lg p-8">
          <div className="flex items-center gap-6 mb-8">
            <img 
              src={user?.avatar || "https://via.placeholder.com/100"} 
              alt="Profile" 
              className="w-24 h-24 rounded-full"
            />
            <div>
              <h2 className="text-white text-2xl">{user?.name}</h2>
              <p className="text-gray-400">{user?.email}</p>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-6">
            <h3 className="text-white text-xl mb-4">Account Settings</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-gray-800">
                <span className="text-gray-400">Name</span>
                <span className="text-white">{user?.name}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-800">
                <span className="text-gray-400">Email</span>
                <span className="text-white">{user?.email}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;