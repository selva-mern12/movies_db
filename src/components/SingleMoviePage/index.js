import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Header';
import LoadingView from '../Unsuccessfull';
import CastAndCrew from '../CastAndCrew';
import './index.css';

const pageStatus = {
  initial: 'INITIAL',
  loading: 'LOADING',
  failure: 'FAILURE',
  success: 'SUCCESS',
};

const SingleMoviePage = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState({});
  const [castCrewDetails, setCastCrewDetails] = useState({});
  const [moviePageStatus, setMoviePageStatus] = useState(pageStatus.initial);

  useEffect(() => {  
    const getMovieDetails = async () => {
    setMoviePageStatus(pageStatus.loading);
    const responseMovie = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=2502667950235797e9d7ef43b3aebfc6&language=en-US`,
    );
    const responseCastAndCrew = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=2502667950235797e9d7ef43b3aebfc6&language=en-US`,
    );
    if (responseMovie.ok && responseCastAndCrew.ok) {
      const data = await responseMovie.json();
      const dataCast = await responseCastAndCrew.json();
      const updatedData = {
        adult: data?.adult,
        backdropPath: data?.backdrop_path,
        belongsToCollection: data?.belongs_to_collection
          ? {
              id: data.belongs_to_collection.id,
              name: data.belongs_to_collection.name,
              posterPath: data.belongs_to_collection.poster_path,
              backdropPath: data.belongs_to_collection.backdrop_path,
            }
          : null,
        budget: data?.budget === 0 ? 'Not Disclosed' : data.budget,
        genres: Array.isArray(data?.spoken_languages)
          ? data.genres.map(genre => ({ id: genre.id, name: genre.name }))
          : [],
        homepage: data?.homepage,
        id: data?.id,
        imdbId: data?.imdb_id,
        originCountry: Array.isArray(data?.spoken_languages)
          ? data.origin_country.map(country => country)
          : [],
        originalLanguage: data?.original_language,
        originalTitle: data?.original_title,
        overview: data?.overview,
        popularity: data?.popularity,
        posterPath: data?.poster_path,
        productionCompanies: Array.isArray(data?.spoken_languages)
          ? data.production_companies.map(company => ({
              id: company.id,
              logoPath: company.logo_path,
              name: company.name,
              originCountry: company.origin_country,
            }))
          : [],
        productionCountries: Array.isArray(data?.spoken_languages)
          ? data.production_countries.map(country => ({
              iso31661: country.iso_3166_1,
              name: country.name,
            }))
          : [],
        releaseDate: new Date(data?.release_date),
        revenue: data?.revenue === 0 ? 'Not Disclosed' : data.revenue,
        runtime: data?.runtime,
        spokenLanguages: Array.isArray(data?.spoken_languages)
          ? data.spoken_languages.map(language => ({
              englishName: language.english_name,
              iso6391: language.iso_639_1,
              name: language.name,
            }))
          : [],
        status: data?.status,
        tagline: data?.tagline,
        title: data?.title,
        video: data?.video,
        voteAverage: data?.vote_average,
        voteCount: data?.vote_count,
      };
      const updatedDataCast = {
        id: dataCast?.id,
        cast: dataCast?.cast
          ? dataCast.cast.map(cast => ({
              id: cast.id,
              name: cast.name,
              profilePath: cast.profile_path,
              role: cast.character,
            }))
          : [],
        crew: dataCast?.crew
          ? dataCast.crew.map(crew => ({
              id: crew.id,
              name: crew.name,
              profilePath: crew.profile_path,
              role: crew.job,
            }))
          : [],
      };
      setMovieDetails(updatedData);
      setCastCrewDetails(updatedDataCast);
      setMoviePageStatus(pageStatus.success);
    } else {
      setMoviePageStatus(pageStatus.failure);
    }
  };
    getMovieDetails();
  }, [movieId]);



  const renderSingleMoviePage = () => {
    const uniqRole = [...new Set(castCrewDetails?.crew?.map(crew => crew.role))];
    uniqRole.sort();
    const newCrewArr = {};
    for (let i = 0; i < uniqRole.length; i += 1) {
      const roleArr = castCrewDetails.crew.filter(
        crew => crew.role === uniqRole[i],
      );
      newCrewArr[uniqRole[i]] = roleArr;
    }
    console.log(newCrewArr[uniqRole[0]]);

    movieDetails?.productionCompanies?.sort((a, b) =>
      a.originCountry.localeCompare(b.originCountry),
    );
    switch (moviePageStatus) {
      case pageStatus.loading:
        return <LoadingView />;
      case pageStatus.failure:
        return null;
      case pageStatus.success:
        return (
          <div className="single-page-container">
            <div className="single-page-header">
              <div>
                <h1 className="single-page-heading">{movieDetails.title}</h1>
                <p className="single-page-tagline">
                  {movieDetails.tagline}
                  {'         '}
                  <a
                    href="#castAndCrew"
                    style={{
                      color: '#fff',
                      fontSize: '12px',
                      paddingLeft: '20px',
                    }}
                  >
                    Cast & Crew
                  </a>
                </p>
              </div>
              <div className="movie-rdt-container">
                <p className="rating">
                  Rating <br />
                  {movieDetails.voteAverage.toFixed(1)} &#9733;
                </p>
                <a
                  href={`https://www.imdb.com/title/${movieDetails.imdbId}/`}
                  target="_blank"
                  rel="noreferrer"
                  className="imdb"
                >
                  IMDB
                </a>
                <div>
                  <p className="date-time">
                    {`${movieDetails.releaseDate.getDate()} ${movieDetails.releaseDate.toLocaleString(
                      'en-In',
                      {
                        month: 'short',
                      },
                    )}`}{' '}
                    {`${movieDetails.releaseDate.getFullYear()}`} &#128198;
                  </p>
                  <p className="date-time">
                    {`${Math.floor(movieDetails.runtime / 60)}h ${
                      movieDetails.runtime % 60
                    }min`}{' '}
                    &#8987;
                  </p>
                </div>
              </div>
            </div>
            <div className="single-movie-image-container">
              <img
                src={`https://image.tmdb.org/t/p/w500${movieDetails.posterPath}`}
                alt={movieDetails.title}
                className="image"
              />
              {movieDetails.belongsToCollection?.posterPath &&
              movieDetails.belongsToCollection?.backdropPath ? (
                <div className="single-movie-carousel">
                  <div className="single-movie-carousel-track">
                    <div className="movie-imge-con">
                      <img
                        src={`https://image.tmdb.org/t/p/w500${movieDetails.backdropPath}`}
                        alt={movieDetails.title}
                        className="image"
                      />
                    </div>
                    <div className="movie-imge-con">
                      <img
                        src={`https://image.tmdb.org/t/p/w500${movieDetails.belongsToCollection.posterPath}`}
                        alt={movieDetails.title}
                        className="image"
                      />
                    </div>
                    <div className="movie-imge-con">
                      <img
                        src={`https://image.tmdb.org/t/p/w500${movieDetails.belongsToCollection.backdropPath}`}
                        alt={movieDetails.title}
                        className="image"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <img
                  src={`https://image.tmdb.org/t/p/w500${movieDetails.backdropPath}`}
                  alt={movieDetails.title}
                  className="image"
                />
              )}
            </div>
            <ul className="genre-list">
              {movieDetails.genres.map(genre => (
                <li key={genre.id} className="genre">
                  {genre.name}
                </li>
              ))}
            </ul>
            <div style={{ display: 'flex', width: '60vw' }}>
              <p className="overview">{movieDetails.overview}</p>
              <ul className="official-language">
                Available Language
                {movieDetails.spokenLanguages.map(language => (
                  <li key={language.iso6391} className="language">
                    {language.name}
                  </li>
                ))}
              </ul>
            </div>
            <div className="budget-collection">
              <div style={{ display: 'flex' }}>
                <p className="bud-coll">
                  Budget: <span className="money">$ {movieDetails.budget}</span>
                </p>
                <p className="bud-coll">
                  Collection :{' '}
                  <span className="money">$ {movieDetails.revenue}</span>
                </p>
              </div>
              <p>
                Status: <span className="money">{movieDetails.status}</span>
              </p>
            </div>
            <div style={{ width: '60vw' }}>
              <h4 className="production">Production Companies </h4>
              <ul className="production-company-list">
                {movieDetails.productionCompanies.map(company => (
                  <li key={company.id} className="production-company">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${company.logoPath}`}
                      alt={company.name}
                      className="company-logo"
                    />
                    <p className="company-name">{company.name}</p>
                    <p className="company-country">
                      {
                        movieDetails.productionCountries.find(
                          country => country.iso31661 === company.originCountry,
                        )?.name
                      }
                    </p>
                  </li>
                ))}
              </ul>
            </div>{' '}
            <h3 className="cast-crew-main-head">Cast & Crew</h3>
            <div id="castAndCrew">
              <div className="cast-crew-container">
                <h3 className="production">Cast</h3>
                <ul>
                  {castCrewDetails.cast.map(cast => (
                    <CastAndCrew key={cast.id} castAndCrew={cast} />
                  ))}
                </ul>
              </div>
              <div className="cast-crew-container">
                <h3 className="production">Crew</h3>
                {uniqRole.map(role => (
                  <>
                    <h3 className="crew-headings">{role}</h3>
                    <ul>
                      {newCrewArr[role].map(crew => (
                        <CastAndCrew key={crew.id} castAndCrew={crew} />
                      ))}
                    </ul>
                  </>
                ))}
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="main-single-page-container">
      <Header singleMovie />
      <div className="single-movie-bg-page">
        {renderSingleMoviePage()}
      </div>
    </div>
  );
};

export default SingleMoviePage;