import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FaSearch} from 'react-icons/fa'
import HeaderMobileTabs from '../HeaderMobileTabs'
import HeaderLgTabs from '../HeaderLgTabs'

import './index.css'

const mobileTabsList = [
  {
    title: 'Home',
    id: 1,
  },
  {
    title: 'Search',
    id: 2,
  },
  {
    title: 'Profile',
    id: 3,
  },
]

const lgTabsList = [
  {
    title: 'Home',
    id: 1,
  },
  {
    title: 'Profile',
    id: 3,
  },
]

class Header extends Component {
  state = {
    showTabs: false,
    search: '',
    mobileActiveTabId: mobileTabsList[0].id,
    lgTabsActiveId: lgTabsList[0].id,
  }

  onClickShowTabs = () => {
    this.setState(prevState => ({showTabs: !prevState.showTabs}))
  }

  onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  onClickCloseTabs = () => {
    this.setState(prevState => ({showTabs: !prevState.showTabs}))
  }

  onChangeSearchInput = event => {
    this.setState({search: event.target.value})
  }

  onClickChangeMobileActiveTab = tabId => {
    this.setState({mobileActiveTabId: tabId, showTabs: false})
  }

  onClickChangeLgActiveTab = tabId => {
    this.setState({lgTabsActiveId: tabId, showTabs: false})
  }

  onClockShowSearchResults = () => {
    const {search} = this.state
  }

  render() {
    const {showTabs, search, mobileActiveTabId, lgTabsActiveId} = this.state
    return (
      <div className="header-bg-container">
        <div className="header-responsive-container">
          <div className="header-logo-container">
            <Link to="/" className="link-item">
              <img
                src="https://res.cloudinary.com/dciu5crui/image/upload/v1655187898/insta%20share%20mini%20project/Standard_Collection_8app_logo_y7uc7i.png"
                alt="website logo"
                className="header-website-logo"
              />
            </Link>
            <h1 className="header-website-heading">Insta Share</h1>
          </div>
          <button
            type="button"
            className="hamburger-button"
            onClick={this.onClickShowTabs}
          >
            <img
              src="https://res.cloudinary.com/dciu5crui/image/upload/v1655218325/insta%20share%20mini%20project/menuhamburger_bh9mry.svg"
              alt="hamburger icon"
              className="hamburger-icon"
            />
          </button>
          <div className="lg-header-tabs-container">
            <div className="search-lg-search-hide-container">
              <Link to="/search" className="link-item">
                <div className="search-input-icon-container">
                  <input
                    type="search"
                    className="search-element"
                    placeholder="Search Caption"
                    value={search}
                    onChange={this.onChangeSearchInput}
                  />
                  <button
                    type="button"
                    className="search-icon-container"
                    onClick={this.onClockShowSearchResults}
                  >
                    <FaSearch className="search-icon" />
                  </button>
                </div>
              </Link>
            </div>

            <ul className="lg-tab-items-container">
              {lgTabsList.map(eachTab => (
                <HeaderLgTabs
                  tabDetails={eachTab}
                  key={eachTab.id}
                  isActive={lgTabsActiveId === eachTab.id}
                  onClickChangeLgActiveTab={this.onClickChangeLgActiveTab}
                />
              ))}
            </ul>
            <button
              type="button"
              className="logout-button"
              onClick={this.onClickLogout}
            >
              Logout
            </button>
          </div>
        </div>
        {showTabs && (
          <div className="sm-tabs-container">
            <div className="tabs-responsive-container">
              <ul className="mobile-tabs-container">
                {mobileTabsList.map(eachTab => (
                  <HeaderMobileTabs
                    tabDetails={eachTab}
                    key={eachTab.id}
                    isActive={mobileActiveTabId === eachTab.id}
                    onClickChangeMobileActiveTab={
                      this.onClickChangeMobileActiveTab
                    }
                  />
                ))}
              </ul>
              <div className="logout-close-buttons-container">
                <button
                  type="button"
                  className="logout-button"
                  onClick={this.onClickLogout}
                >
                  Logout
                </button>
                <button type="button" className="close-button">
                  <img
                    src="https://res.cloudinary.com/dciu5crui/image/upload/v1655218879/insta%20share%20mini%20project/Shapeclose_icon_gxucjf.svg"
                    alt="close icon"
                    className="close-icon"
                    onClick={this.onClickCloseTabs}
                  />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default withRouter(Header)
