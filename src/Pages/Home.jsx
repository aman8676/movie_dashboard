import React from "react";
import { useMovie } from "../Context/MovieContext";

import{useState,useEffect} from "react"

import MovieCard from "../Components/MovieCard";

import {searchMovies,getPopularMovies} from "../services/api"



function Home() {
  
  const[searchquery,setsearchquery] =useState("");

  const [movies,setMovies] = useState([])
  const[error,setError] = useState(null)
  const[loading,setLoading]=useState(true)


  const { favorites, addToFavorites, removeFavorites, isFavorite } =useMovie();



  useEffect(()=>{
    const loadPopularMovies = async()=>{
      try{
        const popularMovies = await getPopularMovies()
        setMovies(popularMovies)
      }
      catch(err)
      {
        console.log(err)
        setError("Failed to load movies....")
      }
      finally{
        setLoading(false)
      }
    }

    loadPopularMovies()
  },[])

  const handleSearch=(async (e)=>{
    e.preventDefault();
    if(!searchquery.trim()) return;
    //if(loading) return;
    setLoading(true)
    try{
      const searchResult = await searchMovies(searchquery)

      setMovies(searchResult||[]);

    }

    catch(err){
      console.log(err)
      setError("Failed to search movies");
    }

    finally{
      setLoading(false)
    }
    
  })

  

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-10">
      <h1 className="text-4xl font-bold text-center text-white mb-10">
        🎥 Movie Library
      </h1>
      <form
        onSubmit={handleSearch}
        className="search-form flex justify-center my-6 gap-x-4"
      >
        <input
          type="text"
          placeholder="Search for movies..."
          className=" w-full max-w-md px-4 py-2 rounded-lg border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-lg"
          value={searchquery}
          onChange={(e) => setsearchquery(e.target.value)}
        />
        <button
          type="submit"
          className="
        px-6 py-3
        bg-red-600 text-white
        rounded-lg
        border border-red-300
        shadow-lg
        hover:bg-red-400
        hover:shadow-xl
        active:bg-red-800
        focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
        transition-all duration-200
        font-semibold
      "
        >
          Search
        </button>
      </form>

      {error && <div className="err-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4 justify-items-center overflow-visible">
            {movies.map(
              (movie) =>
                movie.title
                  .toLowerCase()
                  .startsWith(searchquery.toLowerCase()) && (
                  <MovieCard movie={movie} key={movie.id} />
                )
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
