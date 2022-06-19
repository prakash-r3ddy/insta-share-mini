import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsGrid3X3Gap} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'
import Loader from 'react-loader-spinner'
import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class MyProfile extends Component {
  state = {
    profileApiStatus: apiStatusConstants.initial,
    profileData: [],
  }

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({profileApiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/insta-share/my-profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const updatedData = {
        followersCount: data.profile.followers_count,
        followingCount: data.profile.following_count,
        id: data.profile.id,
        posts: data.profile.posts,
        postsCount: data.profile.posts_count,
        profilePic: data.profile.profile_pic,
        stories: data.profile.stories,
        userBio: data.profile.user_bio,
        userName: data.profile.user_name,
        userId: data.profile.user_id,
      }
      this.setState({
        profileApiStatus: apiStatusConstants.success,
        profileData: updatedData,
      })
    } else {
      this.setState({profileApiStatus: apiStatusConstants.failure})
    }
  }

  showProfileSuccessView = () => {
    const {profileData} = this.state
    const {
      followersCount,
      followingCount,
      posts,
      postsCount,
      profilePic,
      stories,
      userBio,
      userId,
      userName,
    } = profileData

    return (
      <>
        <div className="profile-header-container">
          <div className="profile-sm-view-container">
            <p className="profile-comp-username">{userName}</p>
            <div className="profile-following-followers-container">
              <img
                src={profilePic}
                alt="my profile"
                className="profile-comp-profile-pic"
              />
              <div className="container-style-one">
                <h1 className="text-style-one">{postsCount}</h1>
                <p className="text-style-two">Posts</p>
              </div>
              <div className="container-style-one">
                <h1 className="text-style-one">{followersCount}</h1>
                <p className="text-style-two">Followers</p>
              </div>
              <div className="container-style-one">
                <h1 className="text-style-one">{followingCount}</h1>
                <p className="text-style-two">Following</p>
              </div>
            </div>
            <p className="profile-user-id">{userId}</p>
            <p className="profile-user-bio">{userBio}</p>
            <ul className="profile-stories-list-container">
              {stories.map(eachStory => (
                <li className="profile-stories-list-item" key={eachStory.id}>
                  <img
                    src={eachStory.image}
                    alt="story"
                    className="profile-story-image"
                  />
                </li>
              ))}
            </ul>
          </div>
          <div className="profile-lg-view-container">
            <div className="profile-profile-details-container">
              <img
                src={profilePic}
                alt="my profile"
                className="lg-profile-image"
              />
              <div className="lg-profile-details-container">
                <h1 className="lg-profile-name">{userName}</h1>
                <div className="lg-following-followers-container">
                  <div className="container-style-two">
                    <h1 className="text-style-three">{postsCount}</h1>
                    <p className="text-style-four">Posts</p>
                  </div>
                  <div className="container-style-two">
                    <h1 className="text-style-three">{followersCount}</h1>
                    <p className="text-style-four">Followers</p>
                  </div>
                  <div className="container-style-two">
                    <h1 className="text-style-three">{followingCount}</h1>
                    <p className="text-style-four">Following</p>
                  </div>
                </div>
                <p className="lg-user-id">{userId}</p>
                <p className="lg-user-bio">{userBio}</p>
              </div>
            </div>
            <ul className="profile-stories-list-container">
              {stories.map(eachStory => (
                <li className="profile-stories-list-item" key={eachStory.id}>
                  <img
                    src={eachStory.image}
                    alt="story"
                    className="profile-story-image"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="profile-footer-container">
          <div className="grid-icon-container">
            <BsGrid3X3Gap className="grid-icon" />
            <h1 className="posts-text-profile">Posts</h1>
          </div>
          {postsCount === 0 ? (
            <div className="no-posts-view-container">
              <div className="camera-icon-container">
                <BiCamera className="camera-icon" />
              </div>
              <h1 className="no-posts-text">No Posts Yet</h1>
            </div>
          ) : (
            <ul className="profile-posts-list-container">
              {posts.map(eachPost => (
                <li className="profile-post-list-item" key={eachPost.id}>
                  <img
                    src={eachPost.image}
                    alt="post"
                    className="profile-post-image"
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      </>
    )
  }

  showProfileLoadingView = () => (
    <div className="profile-loading-container" testid="loader">
      <Loader type="Oval" height="50" width="50" color="#4094EF" />
    </div>
  )

  onClickRetryProfileApi = () => {
    this.getProfileDetails()
  }

  showProfileFailureView = () => (
    <div className="profile-failure-container">
      <img
        src="https://res.cloudinary.com/dciu5crui/image/upload/v1655523679/insta%20share%20mini%20project/Group_7522failure-img_ippwpe.png"
        alt="failure view"
        className="profile-failure-image"
      />
      <p className="profile-failure-text">
        Something went wrong. Please try again
      </p>
      <button
        type="button"
        className="profile-try-again-button"
        onClick={this.onClickRetryProfileApi}
      >
        Try again
      </button>
    </div>
  )

  renderProfileDetails = () => {
    const {profileApiStatus} = this.state

    switch (profileApiStatus) {
      case apiStatusConstants.success:
        return this.showProfileSuccessView()
      case apiStatusConstants.inProgress:
        return this.showProfileLoadingView()
      case apiStatusConstants.failure:
        return this.showProfileFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="profile-bg-container">
          {this.renderProfileDetails()}
        </div>
      </>
    )
  }
}

export default MyProfile
