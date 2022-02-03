import './index.css'

const LanguageFilterItem = props => {
  const {languageDetails, setActiveLanguageFilterId, isActive} = props
  const {id, language} = languageDetails

  const buttonClassName = isActive ? 'lang-button active' : 'lang-button'

  const onClickLanguageFilterId = () => {
    setActiveLanguageFilterId(id)
  }

  return (
    <li className="language-filter-item-container">
      <button
        type="button"
        className={buttonClassName}
        onClick={onClickLanguageFilterId}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
