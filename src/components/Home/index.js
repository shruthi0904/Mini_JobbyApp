import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = props => {
  const onClickFindJobs = () => {
    const {history} = props
    history.replace('/jobs')
  }
  return (
    <>
      <Header />
      <div className="home-container">
        <div className="home-info-container">
          <h1 className="home-heading">Find The Job That Fits Your Life</h1>
          <p className="home-info">
            Millions of people are searching for jobs, salary information,
            company reviews. Find the job that fits your abilities and
            potential.
          </p>
          <Link to="/jobs" className="link-btn">
            <button
              type="button"
              className="find-job-btn"
              onClick={onClickFindJobs}
            >
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}
export default Home
