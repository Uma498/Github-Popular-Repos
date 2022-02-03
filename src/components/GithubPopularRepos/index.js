import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class GithubPopularRepos extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    repositoriesData: [],
    activeLanguageFilterId: languageFiltersData[0].id,
  }

  componentDidMount() {
    this.getRepositories()
  }

  getRepositories = async () => {
    const {activeLanguageFilterId} = this.state

    this.setState({apiStatus: apiStatusConstants.inProgress})

    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeLanguageFilterId}`
    const response = await fetch(apiUrl)
    const data = await response.json()

    const updatedData = data.popular_repos.map(eachRepo => ({
      avatarUrl: eachRepo.avatar_url,
      forksCount: eachRepo.forks_count,
      id: eachRepo.id,
      issuesCount: eachRepo.issues_count,
      name: eachRepo.name,
      starsCount: eachRepo.stars_count,
    }))

    if (response.ok === true) {
      this.setState({
        apiStatus: apiStatusConstants.success,
        repositoriesData: updatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {repositoriesData} = this.state
    return (
      <ul className="repositories-list">
        {repositoriesData.map(eachRepo => (
          <RepositoryItem key={eachRepo.id} repositoryDetails={eachRepo} />
        ))}
      </ul>
    )
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png "
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-message">Something Went Wrong</h1>
    </div>
  )

  renderLoadingView = () => (
    <div testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  setActiveLanguageFilterId = id => {
    this.setState({activeLanguageFilterId: id}, this.getRepositories)
  }

  renderLanguageFilterItemData = () => {
    const {activeLanguageFilterId} = this.state
    return (
      <ul className="language-filtered-list">
        {languageFiltersData.map(eachLanguage => (
          <LanguageFilterItem
            key={eachLanguage.id}
            languageDetails={eachLanguage}
            isActive={eachLanguage.id === activeLanguageFilterId}
            setActiveLanguageFilterId={this.setActiveLanguageFilterId}
          />
        ))}
      </ul>
    )
  }

  renderRepositories = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="github-repos-container">
        <div className="github-repos-card">
          <h1 className="heading">Popular</h1>
          {this.renderLanguageFilterItemData()}
          {this.renderRepositories()}
        </div>
      </div>
    )
  }
}

export default GithubPopularRepos
