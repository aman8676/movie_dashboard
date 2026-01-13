import { createContext, useContext, useState, useEffect } from "react";

const MovieContext = createContext({
  favorites: [],
  addToFavorites: () => {},
  removeFavorites: () => {},
  isFavorite: () => false,
});


export const MovieProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);


  useEffect(() => {
    const storedFav = localStorage.getItem("favorites");
    if (storedFav) setFavorites(JSON.parse(storedFav));
  }, []);

 
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);


  const addToFavorites = (movie) => {
    setFavorites((prev) => [...prev, movie]);
  };


  const removeFavorites = (movieId) => {
    setFavorites((prev) => prev.filter((movie) => movie.id !== movieId));
  };

  const isFavorite = (movieId) => {
    return favorites.some((movie) => movie.id === movieId);
  };


  return (
    <MovieContext.Provider
      value={{ favorites, addToFavorites, removeFavorites, isFavorite }}
    >
      {children}
    </MovieContext.Provider>
  );
};


export const useMovie = () => {
  return useContext(MovieContext);
};
