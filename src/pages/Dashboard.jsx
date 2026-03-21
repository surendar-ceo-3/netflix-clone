import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Dashboard = () => {
  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <div className="text-white text-center pt-20">
        <h1 className="text-3xl">Dashboard</h1>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;