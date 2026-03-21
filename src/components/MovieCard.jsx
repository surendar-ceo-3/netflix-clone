import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const imageUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/200x300?text=No+Poster';

  const addToMyList = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (!favorites.find(f => f.id === movie.id)) {
      favorites.push(movie);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      alert('✅ Added to My List!');
    } else {
      alert('Already in My List!');
    }
  };

  return (
    <div 
      className="relative flex-shrink-0 w-48 cursor-pointer transition-transform duration-300 hover:scale-110"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img 
        src={imageUrl} 
        alt={movie.title}
        className="w-full h-64 object-cover rounded"
      />
      {isHovered && (
        <div className="absolute inset-0 bg-black/90 p-4 rounded flex flex-col justify-between">
          <button 
            onClick={addToMyList}
            className="absolute top-2 right-2 bg-black/50 p-2 rounded-full hover:bg-red-600 transition"
          >
            +
          </button>
          <div>
            <h3 className="text-white font-bold text-sm mb-1">{movie.title}</h3>
            <p className="text-green-500 text-xs">
              ⭐ {movie.vote_average?.toFixed(1)}/10
            </p>
            <p className="text-gray-300 text-xs mt-1">
              {movie.release_date?.split('-')[0]}
            </p>
          </div>
          <div className="flex gap-2 mt-2">
            <button 
              onClick={(e) => {
                e.preventDefault();
                window.open(`https://www.themoviedb.org/movie/${movie.id}`, '_blank');
              }}
              className="text-xs bg-white/20 hover:bg-white/30 px-2 py-1 rounded"
            >
              TMDB
            </button>
            <button 
              onClick={(e) => {
                e.preventDefault();
                window.open(`https://www.netflix.com/search?q=${encodeURIComponent(movie.title)}`, '_blank');
              }}
              className="text-xs bg-red-600/70 hover:bg-red-600 px-2 py-1 rounded"
            >
              Netflix
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieCard;