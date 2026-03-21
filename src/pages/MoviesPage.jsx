import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import MovieRow from '../components/MovieRow';
import Footer from '../components/Footer';
import axios from 'axios';

const API_KEY = '8363be845b4b8c79f6996efe42235725';
const BASE_URL = 'https://api.themoviedb.org/3';

const MoviesPage = () => {
  const [movies, setMovies] = useState({
    nowPlaying: [],
    popular: [],
    topRated: [],
    upcoming: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const [nowPlayingRes, popularRes, topRatedRes, upcomingRes] = await Promise.all([
          axios.get(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}`),
          axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}`),
          axios.get(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`),
          axios.get(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}`),
        ]);

        setMovies({
          nowPlaying: nowPlayingRes.data.results,
          popular: popularRes.data.results,
          topRated: topRatedRes.data.results,
          upcoming: upcomingRes.data.results,
        });
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  if (loading) return <div className="bg-black min-h-screen text-white text-center pt-32">Loading Movies...</div>;

  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <div className="pt-24 px-8 pb-16 space-y-8">
        <h1 className="text-white text-3xl font-bold mb-6">Movies</h1>
        <MovieRow title="Now Playing" movies={movies.nowPlaying} />
        <MovieRow title="Popular Movies" movies={movies.popular} />
        <MovieRow title="Top Rated Movies" movies={movies.topRated} />
        <MovieRow title="Upcoming Movies" movies={movies.upcoming} />
      </div>
      <Footer />
    </div>
  );
};

export default MoviesPage;