import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Layout from './Layout.jsx'

import Home from './Pages/Home.jsx'
import Favorite from './Pages/Favorite.jsx'
import { MovieProvider } from './Context/MovieContext.jsx'
import {createBrowserRouter,createRoutesFromElements,RouterProvider,Route} from "react-router-dom"
import People from './Pages/People.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path='Favorite' element={<Favorite/>}/>
      <Route path='people' element={<People/>}/>
    </Route>
  )
);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MovieProvider>
      <RouterProvider router={router} />
    </MovieProvider>
  </StrictMode>
);
