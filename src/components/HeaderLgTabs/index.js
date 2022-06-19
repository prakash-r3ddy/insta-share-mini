import {Link} from 'react-router-dom'
import './index.css'

const HeaderLgTabs = props => {
  const {tabDetails, isActive, onClickChangeLgActiveTab} = props
  const {title, id} = tabDetails

  const changeActiveTab = () => {
    onClickChangeLgActiveTab(id)
  }

  const activeTab = isActive ? 'active-tab' : ''

  let path

  switch (title) {
    case 'Home':
      path = '/'
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
        <button type="button" className={`list-item ${activeTab}`}>
          {title}
        </button>
      </Link>
    </li>
  )
}

export default HeaderLgTabs
