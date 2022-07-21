import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillHome} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import './index.css'

const Header = props => {
  const {history} = props
  const onClickLogoutBtn = () => {
    history.replace('/login')
    Cookies.remove('jwt_token')
  }
  return (
    <nav className="nav-bar">
      <div className="nav-content">
        <Link to="/" className="link-item">
          <img
            className="website-logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </Link>

        <ul className="mobile-nav-menu-list">
          <li className="mobile-nav-menu-item">
            <Link to="/" className="link-item">
              <AiFillHome />
            </Link>
          </li>
          <li className="mobile-nav-menu-item">
            <Link to="/jobs" className="link-item">
              <BsBriefcaseFill />
            </Link>
          </li>
          <li className="mobile-nav-menu-item">
            <Link to="/login" className="link-item">
              <FiLogOut />
            </Link>
          </li>
        </ul>
        <div className="desktop-nav-menu">
          <ul className="desktop-nav-menu-list">
            <li className="desktop-nav-menu-item">
              <Link to="/" className="link-item">
                Home
              </Link>
            </li>
            <li className="desktop-nav-menu-item">
              <Link to="/jobs" className="link-item">
                Jobs
              </Link>
            </li>
          </ul>
          <Link to="/login" className="link-item">
            <button
              type="button"
              className="logout-btn"
              onClick={onClickLogoutBtn}
            >
              Logout
            </button>
          </Link>
        </div>
      </div>
    </nav>
  )
}
export default withRouter(Header)
