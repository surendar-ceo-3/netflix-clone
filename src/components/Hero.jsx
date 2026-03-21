import React, { useState } from 'react';
import axios from 'axios';

const API_KEY = '8363be845b4b8c79f6996efe42235725';

const Hero = ({ featuredMovie }) => {
  const [showTrailer, setShowTrailer] = useState(false);
  const [trailerKey, setTrailerKey] = useState(null);
  const [loadingTrailer, setLoadingTrailer] = useState(false);

  const fetchTrailer = async () => {
    if (!featuredMovie) return;
    
    setLoadingTrailer(true);
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${featuredMovie.id}/videos?api_key=${API_KEY}`
      );
      const trailer = res.data.results.find(
        v => v.type === 'Trailer' && v.site === 'YouTube'
      );
      if (trailer) {
        setTrailerKey(trailer.key);
        setShowTrailer(true);
      } else {
        alert('Trailer not available for this movie');
      }
    } catch (error) {
      console.error('Error fetching trailer:', error);
      alert('Failed to load trailer');
    } finally {
      setLoadingTrailer(false);
    }
  };

  if (!featuredMovie) {
    return (
      <div className="relative h-screen bg-gradient-to-r from-black to-gray-900">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative h-full flex items-center px-8">
          <div className="text-white max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-4">Netflix Clone</h1>
            <p className="text-lg mb-6">Watch unlimited movies and TV shows.</p>
          </div>
        </div>
      </div>
    );
  }

  const backdropUrl = featuredMovie.backdrop_path 
    ? `https://image.tmdb.org/t/p/original${featuredMovie.backdrop_path}`
    : 'https://via.placeholder.com/1920x1080';

  return (
    <>
      <div className="relative h-screen">
        <div className="absolute inset-0">
          <img 
            src={backdropUrl} 
            alt={featuredMovie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
        </div>
        
        <div className="relative h-full flex items-center px-8">
          <div className="text-white max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-4">{featuredMovie.title}</h1>
            <div className="flex items-center space-x-4 mb-4">
              <span className="text-green-500 font-bold">
                {featuredMovie.vote_average?.toFixed(1)} ⭐
              </span>
              <span className="text-gray-300">{featuredMovie.release_date?.split('-')[0]}</span>
            </div>
            <p className="text-lg mb-6 line-clamp-3">{featuredMovie.overview}</p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={fetchTrailer}
                disabled={loadingTrailer}
                className="bg-white text-black px-8 py-3 rounded font-semibold hover:bg-gray-200 transition flex items-center gap-2 disabled:opacity-50"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                {loadingTrailer ? 'Loading...' : 'Play Trailer'}
              </button>
              <a 
                href={`https://www.netflix.com/search?q=${encodeURIComponent(featuredMovie.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-red-600 text-white px-8 py-3 rounded font-semibold hover:bg-red-700 transition"
              >
                Watch on Netflix
              </a>
              <button className="bg-gray-500/70 text-white px-8 py-3 rounded font-semibold hover:bg-gray-500/90 transition">
                More Info
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Trailer Modal */}
      {showTrailer && trailerKey && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl">
            <button 
              onClick={() => setShowTrailer(false)}
              className="absolute -top-10 right-0 text-white text-2xl hover:text-gray-300 transition"
            >
              ✕ Close
            </button>
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
                title="Movie Trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;