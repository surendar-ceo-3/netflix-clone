import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import MovieRow from '../components/MovieRow';
import Footer from '../components/Footer';
import axios from 'axios';

const API_KEY = '8363be845b4b8c79f6996efe42235725';
const BASE_URL = 'https://api.themoviedb.org/3';

const BrowsePage = () => {
  const [moviesData, setMoviesData] = useState({
    trending: [],
    popular: [],
    topRated: [],
    action: [],
    comedy: [],
    horror: [],
    romance: [],
    documentaries: [],
  });
  const [loading, setLoading] = useState(true);
  const [featuredMovie, setFeaturedMovie] = useState(null);

  useEffect(() => {
    const fetchAllMovies = async () => {
      setLoading(true);
      try {
        const [
          trendingRes,
          popularRes,
          topRatedRes,
          actionRes,
          comedyRes,
          horrorRes,
          romanceRes,
          documentariesRes
        ] = await Promise.all([
          axios.get(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`),
          axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}`),
          axios.get(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`),
          axios.get(`${BASE_URL}/discover/movie?with_genres=28&api_key=${API_KEY}`),
          axios.get(`${BASE_URL}/discover/movie?with_genres=35&api_key=${API_KEY}`),
          axios.get(`${BASE_URL}/discover/movie?with_genres=27&api_key=${API_KEY}`),
          axios.get(`${BASE_URL}/discover/movie?with_genres=10749&api_key=${API_KEY}`),
          axios.get(`${BASE_URL}/discover/movie?with_genres=99&api_key=${API_KEY}`),
        ]);

        const trending = trendingRes.data.results;
        setFeaturedMovie(trending[0]);

        setMoviesData({
          trending: trending,
          popular: popularRes.data.results,
          topRated: topRatedRes.data.results,
          action: actionRes.data.results,
          comedy: comedyRes.data.results,
          horror: horrorRes.data.results,
          romance: romanceRes.data.results,
          documentaries: documentariesRes.data.results,
        });
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllMovies();
  }, []);

  if (loading) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Loading amazing movies... <span className="text-red-500">by Surendar</span></div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <Hero featuredMovie={featuredMovie} />
      
      <div className="relative z-10 -mt-32 px-8 pb-16 space-y-8">
        <MovieRow title="Trending Now" movies={moviesData.trending} />
        <MovieRow title="Popular on Netflix" movies={moviesData.popular} />
        <MovieRow title="Top Rated" movies={moviesData.topRated} />
        <MovieRow title="Action Movies" movies={moviesData.action} />
        <MovieRow title="Comedy Movies" movies={moviesData.comedy} />
        <MovieRow title="Horror Movies" movies={moviesData.horror} />
        <MovieRow title="Romance Movies" movies={moviesData.romance} />
        <MovieRow title="Documentaries" movies={moviesData.documentaries} />
      </div>
      
      <Footer />
    </div>
  );
};

export default BrowsePage;