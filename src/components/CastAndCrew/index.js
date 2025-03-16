const CastAndCrew = ({castAndCrew}) => (
  <li key={castAndCrew.id} className="production-company">
    {castAndCrew.profilePath === null ? (
      <img
        src="https://cdn.vectorstock.com/i/1000x1000/82/94/profile-outline-icon-commerce-on-white-background-vector-37178294.webp"
        alt={castAndCrew.name}
        className="cast-img"
      />
    ) : (
      <img
        src={`https://image.tmdb.org/t/p/w500${castAndCrew.profilePath}`}
        alt={castAndCrew.name}
        className="cast-img"
      />
    )}
    <p className="company-name">{castAndCrew.name}</p>
    <p className="company-country">{castAndCrew.role}</p>
  </li>
)

export default CastAndCrew
