import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <Hero />
      <div className="text-white text-center py-20">
        <h2>Welcome to Netflix Clone</h2>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;