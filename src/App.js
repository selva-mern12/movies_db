import { Route, Routes } from 'react-router-dom'
import {
  PopularMoviesPage,
  TopRatedMoviesPage,
  UpcomingMoviesPage,
} from './components/MovieDBMainPage'

import SingleMoviePage from './components/SingleMoviePage'

import './App.css'

const App = () => (
  <Routes>
    <Route path="/" element={<PopularMoviesPage />} />
    <Route path="/top-rated" element={<TopRatedMoviesPage />} />
    <Route path="/upcoming" element={<UpcomingMoviesPage />} />
    <Route path="/movie/:movieId" element={<SingleMoviePage />} />
  </Routes>
)

export default App
