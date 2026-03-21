import React from 'react';
import MovieCard from './MovieCard';

const MovieRow = ({ title, movies }) => {
  if (!movies || movies.length === 0) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-white text-xl md:text-2xl font-semibold px-8">{title}</h2>
      <div className="flex space-x-4 overflow-x-auto scrollbar-hide px-8">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieRow;