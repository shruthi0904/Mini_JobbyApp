import Cookies from 'js-cookie'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import JobItem from '../JobItem'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const initialEmploymentType = []

class Jobs extends Component {
  state = {
    searchInput: '',
    profile: '',
    profileApiStatus: apiStatusConstants.initial,
    jobsList: [],
    jobsApiStatus: apiStatusConstants.initial,
    employmentType: initialEmploymentType,
    salaryType: '',
  }

  componentDidMount() {
    this.getProfileDetails()
    this.getJobsList()
  }

  getProfileDetails = async () => {
    this.setState({profileApiStatus: apiStatusConstants.inProgress})
    const url = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    const updatedData = {
      name: data.profile_details.name,
      profileImageUrl: data.profile_details.profile_image_url,
      shortBio: data.profile_details.short_bio,
    }
    if (response.ok) {
      this.setState({
        profile: updatedData,
        profileApiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 401) {
      this.setState({profileApiStatus: apiStatusConstants.failure})
    }
  }

  getJobsList = async () => {
    this.setState({jobsApiStatus: apiStatusConstants.inProgress})
    const {searchInput, employmentType, salaryType} = this.state
    console.log(employmentType)
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentType.join()}&minimum_package=${salaryType}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()

    const updatedData = data.jobs.map(eachItem => ({
      companyLogoUrl: eachItem.company_logo_url,
      employmentType: eachItem.employment_type,
      id: eachItem.id,
      jobDescription: eachItem.job_description,
      location: eachItem.location,
      packagePerAnnum: eachItem.package_per_annum,
      rating: eachItem.rating,
      title: eachItem.title,
    }))
    if (response.ok) {
      this.setState({
        jobsList: updatedData,
        jobsApiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 401) {
      this.setState({
        jobsApiStatus: apiStatusConstants.failure,
      })
    }
  }

  addType = newType => {
    this.setState(
      prevState => ({
        employmentType: [...prevState.employmentType, newType],
      }),
      this.getJobsList,
    )
  }

  removeType = newType => {
    const {employmentType} = this.state
    const updatedEmploymentType = employmentType.filter(
      eachType => eachType !== newType,
    )
    this.setState({employmentType: updatedEmploymentType}, this.getJobsList)
  }

  onClickCheckBox = event => {
    if (event.target.checked) {
      this.addType(event.target.id)
    } else {
      this.removeType(event.target.id)
    }
  }

  renderEmployment = () => (
    <div className="employment-container">
      <h1 className="employment">Type of Employment</h1>
      <ul className="employments-list">
        {employmentTypesList.map(eachItem => (
          <li className="item" key={eachItem.employmentTypeId}>
            <input
              type="checkbox"
              id={eachItem.employmentTypeId}
              value={eachItem.employmentTypeId}
              onClick={this.onClickCheckBox}
              className="input"
            />
            <label htmlFor={eachItem.employmentTypeId}>{eachItem.label}</label>
          </li>
        ))}
      </ul>
    </div>
  )

  onClickRadio = event => {
    this.setState({salaryType: event.target.value}, this.getJobsList)
  }

  renderSalary = () => (
    <div className="salary-container">
      <h1 className="salary">Salary Range</h1>
      <ul className="salary-list">
        {salaryRangesList.map(eachItem => (
          <li className="item" key={eachItem.salaryRangeId}>
            <input
              type="radio"
              id={eachItem.salaryRangeId}
              value={eachItem.salaryRangeId}
              onClick={this.onClickRadio}
              name="salary"
              className="input"
            />
            <label htmlFor={eachItem.salaryRangeId}>{eachItem.label}</label>
          </li>
        ))}
      </ul>
    </div>
  )

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearchBtn = () => {
    this.getJobsList()
  }

  renderSuccessProfile = () => {
    const {profile} = this.state
    const {name, profileImageUrl, shortBio} = profile

    return (
      <div className="profile-container">
        <img src={profileImageUrl} className="profile-img" alt="profile" />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-bio">{shortBio}</p>
      </div>
    )
  }

  onClickRetryProfile = () => {
    this.getProfileDetails()
  }

  renderFailureProfile = () => (
    <div className="failure-container">
      <button
        type="button"
        className="retry-btn"
        onClick={this.onClickRetryProfile}
      >
        Retry
      </button>
    </div>
  )

  renderLoading = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderProfile = () => {
    const {profileApiStatus} = this.state

    switch (profileApiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessProfile()
      case apiStatusConstants.inProgress:
        return this.renderLoading()
      case apiStatusConstants.failure:
        return this.renderFailureProfile()
      default:
        return null
    }
  }

  renderNoJobs = () => (
    <div className="no-jobs-container">
      <img
        className="no-jobs-img"
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
      />
      <h1 className="no-jobs-heading">No Jobs Found</h1>
      <p className="no-jobs-text">
        We could not find any jobs. Try other filters.
      </p>
    </div>
  )

  renderSuccessJobs = () => {
    const {jobsList} = this.state
    if (jobsList.length < 1) {
      return this.renderNoJobs()
    }
    return (
      <ul className="jobs-list">
        {jobsList.map(eachJob => (
          <JobItem key={eachJob.id} jobDetails={eachJob} />
        ))}
      </ul>
    )
  }

  onClickRetryJobs = () => {
    this.getJobsList()
  }

  renderFailureJobs = () => (
    <div className="failure-jobs-container">
      <img
        className="jobs-failure-img"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="jobs-failure-heading">Oops! Something Went Wrong</h1>
      <p className="jobs-failure-text">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="retry-btn"
        onClick={this.onClickRetryJobs}
      >
        Retry
      </button>
    </div>
  )

  renderJobsListContainer = () => {
    const {jobsApiStatus} = this.state

    switch (jobsApiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessJobs()
      case apiStatusConstants.inProgress:
        return this.renderLoading()
      case apiStatusConstants.failure:
        return this.renderFailureJobs()
      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state
    return (
      <>
        <Header />
        <div className="jobs-container">
          <div className="filter-container">
            <div className="mobile-search-input-container">
              <input
                type="search"
                className="search-input"
                value={searchInput}
                placeholder="Search"
                onChange={this.onChangeSearchInput}
              />
              <button
                type="button"
                testid="searchButton"
                className="search-btn"
                onClick={this.onClickSearchBtn}
              >
                <BsSearch />
              </button>
            </div>
            {this.renderProfile()}
            <hr className="hr-line" />
            {this.renderEmployment()}
            <hr className="hr-line" />
            {this.renderSalary()}
          </div>
          <div className="search-jobs-container">
            <div className="desktop-search-input-container">
              <input
                type="search"
                className="search-input"
                value={searchInput}
                placeholder="Search"
                onChange={this.onChangeSearchInput}
              />
              <button
                type="button"
                testid="searchButton"
                className="search-btn"
                onClick={this.onClickSearchBtn}
              >
                <BsSearch />
              </button>
            </div>
            {this.renderJobsListContainer()}
          </div>
        </div>
      </>
    )
  }
}
export default Jobs
