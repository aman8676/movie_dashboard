import { useState } from 'react'
import MovieCard from './Components/MovieCard'
import Home from './Pages/Home'
import './App.css'
import { MovieProvider } from './Context/MovieContext'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <MovieProvider>
        <Home />
      </MovieProvider>
    </>
  );
}

export default App
