import {Link} from 'react-router-dom'
import './index.css'

const MoviesItem = ({movieDetails}) => {
  const {
    backdropPath,
    id,
    posterPath,
    title,
    overview,
    originalLanguage,
    releaseDate,
    voteAverage,
    adult,
    // originalTitle,
    // popularity,
    // video,
    // voteCount,
  } = movieDetails

  const getLanguageName = code => {
    const languageNames = new Intl.DisplayNames(['en'], {type: 'language'})
    return languageNames.of(code) || 'Unknown Language'
  }

  return (
    <li key={id} className="movie-item-list">
      <Link to={`/movie/${id}`}>
        <div className={adult ? 'adult carousel' : 'carousel'}>
          <div className="carousel-track">
            <div className="movie-imge-con">
              <img
                src={`https://image.tmdb.org/t/p/w500${backdropPath}`}
                alt={title}
                className="movie-imge"
              />
            </div>
            <div className="movie-imge-con">
              <img
                src={`https://image.tmdb.org/t/p/w500${posterPath}`}
                alt={title}
                className="movie-imge"
              />
            </div>
          </div>
        </div>
      </Link>
      <div style={{display: 'flex', alignItems: 'center'}}>
        <h2 className="movie-name">{title}</h2>
        <Link to={`/movie/${id}`} className="link">
          <button type="button">View Details</button>
        </Link>{' '}
      </div>
      <p className="movie-description">{overview}</p>
      <div className="arrange-rat-rel-lan">
        <p>Language: {getLanguageName(originalLanguage)}</p>
        <p>Release on: {releaseDate}</p>
        <p>Rating: {voteAverage.toFixed(1)}</p>
      </div>
    </li>
  )
}

export default MoviesItem
