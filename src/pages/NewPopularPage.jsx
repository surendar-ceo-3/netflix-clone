import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import MovieRow from '../components/MovieRow';
import Footer from '../components/Footer';
import axios from 'axios';

const API_KEY = '8363be845b4b8c79f6996efe42235725';
const BASE_URL = 'https://api.themoviedb.org/3';

const NewPopularPage = () => {
  const [content, setContent] = useState({
    newMovies: [],
    popularMovies: [],
    newTV: [],
    popularTV: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      try {
        const [newMoviesRes, popularMoviesRes, newTVRes, popularTVRes] = await Promise.all([
          axios.get(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}`),
          axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}`),
          axios.get(`${BASE_URL}/tv/airing_today?api_key=${API_KEY}`),
          axios.get(`${BASE_URL}/tv/popular?api_key=${API_KEY}`),
        ]);

        setContent({
          newMovies: newMoviesRes.data.results,
          popularMovies: popularMoviesRes.data.results,
          newTV: newTVRes.data.results,
          popularTV: popularTVRes.data.results,
        });
      } catch (error) {
        console.error("Error fetching content:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, []);

  if (loading) return <div className="bg-black min-h-screen text-white text-center pt-32">Loading...</div>;

  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <div className="pt-24 px-8 pb-16 space-y-8">
        <h1 className="text-white text-3xl font-bold mb-6">New & Popular</h1>
        <MovieRow title="New Movies (Coming Soon)" movies={content.newMovies} />
        <MovieRow title="Popular Movies" movies={content.popularMovies} />
        <MovieRow title="New TV Shows (Airing Today)" movies={content.newTV} />
        <MovieRow title="Popular TV Shows" movies={content.popularTV} />
      </div>
      <Footer />
    </div>
  );
};

export default NewPopularPage;