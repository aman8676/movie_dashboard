import React from "react";
import { useNavigate } from "react-router-dom"
import { useMovie } from "../Context/MovieContext";

import MovieCard from "../Components/MovieCard";

const Favorite = () => {
  
  const{ favorites }=useMovie();

  const navigate = useNavigate();


  
  const goHome=()=>{
    navigate("/");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-10">
      {favorites.length > 0 ? (
        <>
          <h1 className="text-4xl font-bold text-center text-white mb-10">
            ❤️ Your Favorite Movies
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4 justify-items-center">
            {favorites.map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
          </div>

          <div className=" absolute bottom-10 left-1/2 transform -translate-x-1/2flex justify-center items-center">
            <button
              className="px-6 py-3 bg-purple-600 text-white rounded-lg shadow-md 
      hover:bg-purple-700 hover:shadow-lg active:bg-purple-800 
      transition-all duration-200 font-semibold"
              onClick={() => navigate("/")}
            >
              Browse Movies 🎥
            </button>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center text-center min-h-screen">
          <h1 className="text-4xl font-extrabold text-purple-400 drop-shadow-lg mb-6">
            ❤️ No Favorite Movies Yet
          </h1>
          <p className="text-lg text-gray-300 mb-8 max-w-xl">
            Start adding movies to your favorites and they'll appear here. Build
            your personal movie collection today!
          </p>
          <button
            className="px-6 py-3 bg-purple-600 text-white rounded-lg shadow-md 
          hover:bg-purple-700 hover:shadow-lg active:bg-purple-800 
          transition-all duration-200 font-semibold"
            onClick={() => navigate("/")}
          >
            Browse Movies 🎥
          </button>
        </div>
      )}
    </div>
  );



}

export default Favorite;
