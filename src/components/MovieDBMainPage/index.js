import RenderMoviesPage from '../RenderMoviesPages'

export const PopularMoviesPage = () => {
  const apiUrl =
    'https://api.themoviedb.org/3/movie/popular?api_key=2502667950235797e9d7ef43b3aebfc6&language=en-US'
  return <RenderMoviesPage apiUrl={apiUrl} />
}

export const TopRatedMoviesPage = () => {
  const apiUrl =
    'https://api.themoviedb.org/3/movie/top_rated?api_key=2502667950235797e9d7ef43b3aebfc6&language=en-US'
  return <RenderMoviesPage apiUrl={apiUrl} />
}

export const UpcomingMoviesPage = () => {
  const apiUrl =
    'https://api.themoviedb.org/3/movie/upcoming?api_key=2502667950235797e9d7ef43b3aebfc6&language=en-US'
  return <RenderMoviesPage apiUrl={apiUrl} />
}
