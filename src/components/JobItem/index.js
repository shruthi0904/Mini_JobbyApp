import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

const JobItem = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails
  return (
    <Link to={`/jobs/${id}`} className="job-link-item">
      <li className="job-item">
        <div className="top-section">
          <img
            className="company-logo"
            src={companyLogoUrl}
            alt="company logo"
          />
          <div className="title-rating-container">
            <h1 className="title">{title}</h1>
            <div className="rating-container">
              <AiFillStar className="react-icon" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="middle-section">
          <div className="middle-section-left">
            <div className="location-container">
              <MdLocationOn className="icon" />
              <p className="location"> {location}</p>
            </div>
            <div className="employment-type-container">
              <BsBriefcaseFill className="icon" />
              <p className="employment-type">{employmentType}</p>
            </div>
          </div>
          <p className="package">{packagePerAnnum}</p>
        </div>
        <hr className="line" />
        <div className="bottom-section">
          <h1 className="description-heading">Description</h1>
          <p className="description">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}
export default JobItem
