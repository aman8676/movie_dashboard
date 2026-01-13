import React from "react";
import { useMovie } from "../Context/MovieContext";

function MovieCard({ movie }) {
  const { isFavorite, addToFavorites, removeFavorites } = useMovie();
  const favorite = isFavorite(movie.id);

  function onFavoriteClick(e) {
    e.preventDefault();
    if (favorite) removeFavorites(movie.id);
    else addToFavorites(movie);
  }

  return (
    <div className="group relative p-[2px] rounded-2xl transition-all duration-300 ease-in-out hover:scale-105 hover:z-50 hover:-translate-y-2">
      
      <div className="absolute inset-0 bg-[conic-gradient(from_180deg_at_50%_50%,#ff0000,#ff9900,#00ffcc,#0066ff,#ff00ff,#ff0000)] animate-spin-slow opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

      <div className="relative bg-gray-900 text-white rounded-2xl overflow-hidden shadow-lg w-64 h-[400px] flex flex-col">
        <div className="relative">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-80 object-cover"
          />
          <button
            onClick={onFavoriteClick}
            className={`absolute top-2 right-2 text-lg px-3 py-2 rounded-full shadow-md transition-all duration-300 ${
              favorite ? "bg-red-500" : "bg-white/30 hover:bg-white/50"
            }`}
          >
            ♥
          </button>
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg truncate">{movie.title}</h3>
          <p className="text-gray-400 text-sm">
            {new Date(movie.release_date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
