import {Component} from 'react'
import Header from '../Header'
import Pagination from '../Pagination'
import MoviesItem from '../MoviesItem'
import LoadingView from '../Unsuccessfull'

import './index.css'

const pageStatus = {
  initial: 'INITIAL',
  loading: 'LOADING',
  failure: 'FAILURE',
  success: 'SUCCESS',
}

class RenderMoviesPage extends Component {
  state = {
    popularMoviesList: [],
    totalPages: 0,
    selectedPage: 1,
    popularPageStatus: pageStatus.initial,
    apiUrl: '',
  }

  componentDidMount() {
    const {apiUrl} = this.props
    this.setState({apiUrl}, () => this.getPopularMovies())
  }

  getPopularMovies = async () => {
    const {selectedPage, apiUrl} = this.state
    console.log({apiUrl})
    this.setState({popularPageStatus: pageStatus.loading})
    const response = await fetch(`${apiUrl}&page=${selectedPage}`)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const updatedData = {
        page: data.page,
        results: data.results.map(movie => ({
          adult: movie.adult,
          backdropPath: movie.backdrop_path,
          genreIds: movie.genre_ids,
          id: movie.id,
          originalLanguage: movie.original_language,
          originalTitle: movie.original_title,
          overview: movie.overview,
          popularity: movie.popularity,
          posterPath: movie.poster_path,
          releaseDate: movie.release_date,
          title: movie.title,
          video: movie.video,
          voteAverage: movie.vote_average,
          voteCount: movie.vote_count,
        })),
        totalPages: data.total_pages,
        totalResults: data.total_results,
      }
      this.setState({
        popularMoviesList: updatedData.results,
        totalPages: updatedData.totalPages < 500 ? updatedData.totalPages : 500,
        popularPageStatus: pageStatus.success,
      })
    } else {
      this.setState({popularPageStatus: pageStatus.failure})
    }
  }

  updatePageNum = ({action, num}) => {
    const {selectedPage, totalPages} = this.state

    console.log(totalPages)
    this.setState(prevState => {
      let newPage = prevState.selectedPage

      if (action === 'increase') {
        newPage =
          selectedPage < totalPages ? prevState.selectedPage + 1 : selectedPage
      } else if (action === 'decrease') {
        newPage = selectedPage > 1 ? prevState.selectedPage - 1 : selectedPage
      } else if (num) {
        newPage = Math.min(Math.max(num, 1), totalPages) // Ensures num stays within valid range
      }

      return {selectedPage: newPage}
    }, this.getPopularMovies)
  }

  changeApi = userSearch => {
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=2502667950235797e9d7ef43b3aebfc6&language=en-US&query=${userSearch}`
    if (userSearch !== '') {
      this.setState({apiUrl}, () => this.getPopularMovies())
    }
  }

  renderPopularPage = () => {
    const {popularMoviesList, popularPageStatus} = this.state
    switch (popularPageStatus) {
      case pageStatus.loading:
        return <LoadingView />
      case pageStatus.failure:
        return null
      case pageStatus.success:
        return (
          <ul className="popular-page">
            {popularMoviesList.map(movieDetails => (
              <MoviesItem key={movieDetails.id} movieDetails={movieDetails} />
            ))}
          </ul>
        )
      default:
        return null
    }
  }

  render() {
    const {totalPages, selectedPage} = this.state
    return (
      <div className="main-bg-popular-page">
        <Header changeApi={this.changeApi} />
        <div className="popular-container">
          <div>{this.renderPopularPage()}</div>
          <Pagination
            totalPage={totalPages}
            selectedPage={selectedPage}
            updatePageNum={this.updatePageNum}
          />
        </div>
      </div>
    )
  }
}

export default RenderMoviesPage
