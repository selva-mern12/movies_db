import {useState} from 'react'
import {Link, useLocation} from 'react-router-dom'
import './index.css'

const Header = props => {
  const {changeApi, singleMovie} = props
  const location = useLocation()
  const [userSearch, setUserSearch] = useState('')

  return (
    <div className="header-container">
      <div className="logo-container">
        <div className={singleMovie ? 'hide-search-box' : 'search-container'}>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <input
              type="text"
              value={userSearch}
              placeholder="Search Movies"
              onChange={event => setUserSearch(event.target.value)}
              className="search-input"
            />
            <button type="button" onClick={() => changeApi(userSearch)}>
              Search
            </button>
          </div>
        </div>
        <Link to="/" className="app-title">
          <h1>movieDB</h1>
        </Link>
        <div style={{visibility: 'hidden'}} className="search-container">
          <input type="search" className="search-input" />
        </div>
      </div>
      <ul className="navbar-container">
        <Link
          to="/top-rated"
          className={
            location.pathname === '/top-rated'
              ? 'navbars navbars-active'
              : 'navbars'
          }
        >
          <li>Top Rated</li>
        </Link>
        <Link
          to="/"
          className={
            location.pathname === '/' ? 'navbars navbars-active' : 'navbars'
          }
        >
          <li>Popular</li>
        </Link>
        <Link
          to="/upcoming"
          className={
            location.pathname === '/upcoming'
              ? 'navbars navbars-active'
              : 'navbars'
          }
        >
          <li>Upcoming</li>
        </Link>
      </ul>
    </div>
  )
}

export default Header
