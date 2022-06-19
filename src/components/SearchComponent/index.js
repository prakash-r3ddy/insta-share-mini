import {FaSearch} from 'react-icons/fa'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Slider from 'react-slick'
import Cookies from 'js-cookie'
import Header from '../Header'
import UserPosts from '../UserPosts'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class SearchComponent extends Component {
  state = {
    search: '',
    searchData: [],
    searchApiStatus: apiStatusConstants.initial,
  }

  onChangeSearch = event => {
    this.setState({search: event.target.value})
  }

  getSearchResults = async () => {
    this.setState({searchApiStatus: apiStatusConstants.inProgress})
    const {search} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/insta-share/posts?search=${search}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const updatedData = data.posts.map(eachPost => ({
        comments: eachPost.comments.map(eachComment => ({
          comment: eachComment.comment,
          userId: eachComment.user_id,
          userName: eachComment.user_name,
        })),
        createdAt: eachPost.created_at,
        likesCount: eachPost.likes_count,
        postDetails: {
          caption: eachPost.post_details.caption,
          imageUrl: eachPost.post_details.image_url,
        },
        postId: eachPost.post_id,
        profilePic: eachPost.profile_pic,
        userId: eachPost.user_id,
        userName: eachPost.user_name,
      }))
      this.setState({
        searchData: updatedData,
        searchApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({searchApiStatus: apiStatusConstants.failure})
    }
  }

  showPostsSuccessView = () => {
    const {searchData} = this.state
    return (
      <>
        {searchData.length === 0 ? (
          <div className="no-search-results-container">
            <img
              src="https://res.cloudinary.com/dciu5crui/image/upload/v1655609527/insta%20share%20mini%20project/Groupsearch-not-found_fnbqtw.png"
              alt="no search results"
              className="no-results-image"
            />
            <h1 className="no-results-heading">Search Not Found</h1>
            <p className="no-search-search-results-text">
              Try different key word or search again
            </p>
          </div>
        ) : (
          <ul className="user-posts-list-container">
            {searchData.map(eachPost => (
              <UserPosts userPostDetails={eachPost} key={eachPost.postId} />
            ))}
          </ul>
        )}
      </>
    )
  }

  showPostsFailureView = () => (
    <div className="posts-failure-container">
      <img
        src="https://res.cloudinary.com/dciu5crui/image/upload/v1655375355/insta%20share%20mini%20project/alert-trianglealert_ej1d1u.svg"
        alt="failure view"
        className="alert-icon"
      />
      <p className="stories-failure-text">
        Something went wrong. Please try again
      </p>
      <button
        className="stories-try-again-button"
        type="button"
        onClick={this.onClickRetryPosts}
      >
        Try again
      </button>
    </div>
  )

  showPostsLoadingView = () => (
    <div className="posts-loader-container" testid="loader">
      <Loader type="Oval" height="50" width="50" color="#4094EF" />
    </div>
  )

  showInitialSearchView = () => (
    <div className="initial-view-container">
      <img
        src="https://res.cloudinary.com/dciu5crui/image/upload/v1655550449/insta%20share%20mini%20project/Frame_1473glow-search_kja939.png"
        alt="initial search"
        className="initial-search"
      />
      <p className="initial-search-text">Search Results will be appear here</p>
    </div>
  )

  renderSearchResults = () => {
    const {searchApiStatus} = this.state
    switch (searchApiStatus) {
      case apiStatusConstants.success:
        return this.showPostsSuccessView()
      case apiStatusConstants.failure:
        return this.showPostsFailureView()
      case apiStatusConstants.inProgress:
        return this.showPostsLoadingView()
      default:
        return this.showInitialSearchView()
    }
  }

  render() {
    const {search} = this.state
    return (
      <>
        <Header />
        <div className="search-component-bg-container">
          <div className="search-responsive-container">
            <div className="container">
              <div className="search-input-icon-container">
                <input
                  type="search"
                  className="search-element"
                  placeholder="Search Caption"
                  value={search}
                  onChange={this.onChangeSearch}
                />
                <button
                  className="search-icon-container"
                  type="button"
                  onClick={this.getSearchResults}
                >
                  <FaSearch className="search-icon" />
                </button>
              </div>
            </div>
            {this.renderSearchResults()}
          </div>
        </div>
      </>
    )
  }
}

export default SearchComponent
