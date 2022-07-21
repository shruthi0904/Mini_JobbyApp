import Header from '../Header'
import './index.css'

const NotFound = () => (
  <>
    <Header />
    <div className="not-found-container">
      <div className="not-found-info-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
          className="not-found-img"
          alt="not found"
        />
        <h1 className="not-found-heading">Page Not Found</h1>
        <p className="not-found-text">
          were sorry, the page you requested could not be found
        </p>
      </div>
    </div>
  </>
)
export default NotFound
