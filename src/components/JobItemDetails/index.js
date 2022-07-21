import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill, BsBoxArrowUpRight} from 'react-icons/bs'

import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {jobDetailsApiStatus: apiStatusConstants.initial, jobDetails: ''}

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({jobDetailsApiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()
      const eachItem = data.job_details
      const updatedJobDetails = {
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        companyWebsiteUrl: eachItem.company_website_url,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
        rating: eachItem.rating,
        title: eachItem.title,
        skills: eachItem.skills.map(eachSkill => ({
          imageUrl: eachSkill.image_url,
          name: eachSkill.name,
        })),
        lifeAtCompany: {
          description: eachItem.life_at_company.description,
          imageUrl: eachItem.life_at_company.image_url,
        },
      }
      const updatedSimilarJobs = data.similar_jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({
        jobDetails: {updatedJobDetails, updatedSimilarJobs},
        jobDetailsApiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 401) {
      this.setState({jobDetailsApiStatus: apiStatusConstants.failure})
    }
  }

  renderLoading = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onClickRetryJobDetails = () => {
    this.getJobDetails()
  }

  renderFailureJobDetails = () => (
    <div className="failure-job-details-container">
      <img
        className="jobs-failure-img"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="jobs-failure-heading">Oops! Something Went Wrong</h1>
      <p className="jobs-failure-text">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        className="retry-btn"
        onClick={this.onClickRetryJobDetails}
      >
        Retry
      </button>
    </div>
  )

  renderSuccessJobDetails = () => {
    const {jobDetails} = this.state
    const {updatedJobDetails, updatedSimilarJobs} = jobDetails
    const {
      companyLogoUrl,
      title,
      rating,
      location,
      employmentType,
      packagePerAnnum,
      jobDescription,
      companyWebsiteUrl,
      skills,
      lifeAtCompany,
    } = updatedJobDetails

    return (
      <div>
        <div className="job-item">
          <div className="top-section">
            <img
              className="company-logo"
              src={companyLogoUrl}
              alt="job details company logo"
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
            <div className="description-heading-container">
              <h1 className="description-heading">Description</h1>
              <a className="visit" href={companyWebsiteUrl} target="blank">
                Visit <BsBoxArrowUpRight />
              </a>
            </div>
            <p className="description">{jobDescription}</p>

            <h1 className="skills-heading">Skills</h1>
            <ul className="skills-container">
              {skills.map(eachSkill => (
                <li className="skill-item" key={eachSkill.id}>
                  <img
                    src={eachSkill.imageUrl}
                    className="skill-img"
                    alt={eachSkill.name}
                  />
                  <p className="skill-name">{eachSkill.name}</p>
                </li>
              ))}
            </ul>
            <h1 className="life-heading">Life at Company</h1>
            <div className="life-text-img-container">
              <p className="life-description">{lifeAtCompany.description}</p>
              <img
                className="life-img"
                src={lifeAtCompany.imageUrl}
                alt="life at company"
              />
            </div>
          </div>
        </div>

        <h1 className="similar-jobs-heading">Similar Jobs</h1>
        <ul className="similar-jobs-container">
          {updatedSimilarJobs.map(eachJob => (
            <li className="similar-job-item">
              <div className="top-section">
                <img
                  className="company-logo"
                  src={eachJob.companyLogoUrl}
                  alt="similar job company logo"
                />
                <div className="title-rating-container">
                  <h1 className="title">{eachJob.title}</h1>
                  <div className="rating-container">
                    <AiFillStar className="react-icon" />
                    <p className="rating">{eachJob.rating}</p>
                  </div>
                </div>
              </div>
              <div className="bottom-section">
                <h1 className="description-heading">Description</h1>
                <p className="description">{eachJob.jobDescription}</p>
              </div>
              <div className="middle-section">
                <div className="middle-section-left">
                  <div className="location-container">
                    <MdLocationOn className="icon" />
                    <p className="location"> {eachJob.location}</p>
                  </div>
                  <div className="employment-type-container">
                    <BsBriefcaseFill className="icon" />
                    <p className="employment-type">{eachJob.employmentType}</p>
                  </div>
                </div>
                <p className="package">{eachJob.packagePerAnnum}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  renderJobDetails = () => {
    const {jobDetailsApiStatus} = this.state
    switch (jobDetailsApiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessJobDetails()
      case apiStatusConstants.inProgress:
        return this.renderLoading()
      case apiStatusConstants.failure:
        return this.renderFailureJobDetails()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-item-details-container">
          {this.renderJobDetails()}
        </div>
      </>
    )
  }
}
export default JobItemDetails
