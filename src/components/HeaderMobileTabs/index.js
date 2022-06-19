import {Link} from 'react-router-dom'
import './index.css'

const HeaderMobileTabs = props => {
  const {tabDetails, isActive, onClickChangeMobileActiveTab} = props
  const {title, id} = tabDetails

  const changeActiveTab = () => {
    onClickChangeMobileActiveTab(id)
  }

  const activeTabColor = isActive ? 'active-tab' : null

  let path

  switch (title) {
    case 'Home':
      path = '/'
      break
    case 'Search':
      path = '/search'
      break
    case 'Profile':
      path = '/my-profile'
      break
    default:
      path = '/'
  }

  return (
    <li onClick={changeActiveTab}>
      <Link to={path} className="link-item">
        <button type="button" className={`list-item ${activeTabColor}`}>
          {title}
        </button>
      </Link>
    </li>
  )
}

export default HeaderMobileTabs
