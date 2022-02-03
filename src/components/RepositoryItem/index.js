import './index.css'

const RepositoryItem = props => {
  const {repositoryDetails} = props
  const {
    avatarUrl,
    name,
    forksCount,
    starsCount,
    issuesCount,
  } = repositoryDetails

  return (
    <li className="repository-item-container">
      <img src={avatarUrl} alt={name} className="repository-img" />
      <h1 className="repository-name">{name}</h1>
      <div className="repository-item-card">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="icon"
        />
        <p className="count">{starsCount} stars</p>
      </div>
      <div className="repository-item-card">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="icon"
        />
        <p className="count">{forksCount} forks</p>
      </div>
      <div className="repository-item-card">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="icon"
        />
        <p className="count">{issuesCount} open issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
