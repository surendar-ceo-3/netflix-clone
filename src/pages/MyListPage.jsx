import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import MovieCard from '../components/MovieCard';
import Footer from '../components/Footer';

const MyListPage = () => {
  const [myList, setMyList] = useState([]);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setMyList(favorites);
  }, []);

  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <div className="pt-24 px-8 pb-16">
        <h1 className="text-white text-3xl font-bold mb-6">My List</h1>
        {myList.length === 0 ? (
          <div className="text-center text-gray-400 py-20">
            <p className="text-xl">Your list is empty</p>
            <p className="mt-2">Add movies and TV shows to your list by clicking the + button</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {myList.map((item) => (
              <MovieCard key={item.id} movie={item} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MyListPage;