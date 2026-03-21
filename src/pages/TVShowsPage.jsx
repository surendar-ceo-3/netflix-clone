import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import MovieRow from '../components/MovieRow';
import Footer from '../components/Footer';
import axios from 'axios';

const API_KEY = '8363be845b4b8c79f6996efe42235725';
const BASE_URL = 'https://api.themoviedb.org/3';

const TVShowsPage = () => {
  const [tvShows, setTvShows] = useState({
    popular: [],
    topRated: [],
    airingToday: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTVShows = async () => {
      setLoading(true);
      try {
        const [popularRes, topRatedRes, airingTodayRes] = await Promise.all([
          axios.get(`${BASE_URL}/tv/popular?api_key=${API_KEY}`),
          axios.get(`${BASE_URL}/tv/top_rated?api_key=${API_KEY}`),
          axios.get(`${BASE_URL}/tv/airing_today?api_key=${API_KEY}`),
        ]);

        setTvShows({
          popular: popularRes.data.results,
          topRated: topRatedRes.data.results,
          airingToday: airingTodayRes.data.results,
        });
      } catch (error) {
        console.error("Error fetching TV shows:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTVShows();
  }, []);

  if (loading) return <div className="bg-black min-h-screen text-white text-center pt-32">Loading TV Shows...</div>;

  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <div className="pt-24 px-8 pb-16 space-y-8">
        <h1 className="text-white text-3xl font-bold mb-6">TV Shows</h1>
        <MovieRow title="Popular TV Shows" movies={tvShows.popular} />
        <MovieRow title="Top Rated TV Shows" movies={tvShows.topRated} />
        <MovieRow title="Airing Today" movies={tvShows.airingToday} />
      </div>
      <Footer />
    </div>
  );
};

export default TVShowsPage;