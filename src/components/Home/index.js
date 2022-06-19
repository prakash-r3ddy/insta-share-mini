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

class Home extends Component {
  state = {
    userStories: [],
    userPosts: [],
    storiesApiStatus: apiStatusConstants.initial,
    postsApiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getStoriesData()
    this.getPostsData()
  }

  getPostsData = async () => {
    this.setState({postsApiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const postsUrl = 'https://apis.ccbp.in/insta-share/posts'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(postsUrl, options)
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
        userPosts: updatedData,
        postsApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({postsApiStatus: apiStatusConstants.failure})
    }
  }

  getStoriesData = async () => {
    this.setState({storiesApiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const storiesUrl = 'https://apis.ccbp.in/insta-share/stories'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(storiesUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      const updatedData = data.users_stories.map(eachStory => ({
        storyUrl: eachStory.story_url,
        userId: eachStory.user_id,
        userName: eachStory.user_name,
      }))
      this.setState({
        storiesApiStatus: apiStatusConstants.success,
        userStories: updatedData,
      })
    } else {
      this.setState({storiesApiStatus: apiStatusConstants.failure})
    }
  }

  showStoriesView = () => {
    const {userStories} = this.state
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 8,
      slidesToScroll: 8,
      arrows: true,
      className: 'slider',
      responsive: [
        {
          breakpoint: 800,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
            infinite: true,
            dots: false,
          },
        },
      ],
    }

    return (
      <ul className="react-slick-container">
        <Slider {...settings}>
          {userStories.map(eachStory => (
            <li className="story-container" key={eachStory.userId}>
              <img
                src={eachStory.storyUrl}
                alt="story"
                className="story-image"
              />
              <p className="user-story-name">{eachStory.userName}</p>
            </li>
          ))}
        </Slider>
      </ul>
    )
  }

  onClickRetryStories = () => {
    this.getStoriesData()
  }

  showStoriesFailureView = () => (
    <div className="products-failure-container">
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
        onClick={this.onClickRetryStories}
      >
        Try again
      </button>
    </div>
  )

  showStoriesLoadingView = () => (
    <div className="products-loader-container" testid="loader">
      <Loader type="Oval" height="50" width="50" color="#4094EF" />
    </div>
  )

  renderStories = () => {
    const {storiesApiStatus} = this.state
    switch (storiesApiStatus) {
      case apiStatusConstants.success:
        return this.showStoriesView()
      case apiStatusConstants.failure:
        return this.showStoriesFailureView()
      case apiStatusConstants.inProgress:
        return this.showStoriesLoadingView()
      default:
        return null
    }
  }

  showPostsSuccessView = () => {
    const {userPosts} = this.state
    return (
      <ul className="user-posts-list-container">
        {userPosts.map(eachPost => (
          <UserPosts userPostDetails={eachPost} key={eachPost.postId} />
        ))}
      </ul>
    )
  }

  onClickRetryPosts = () => {
    this.getPostsData()
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

  renderPosts = () => {
    const {postsApiStatus} = this.state
    switch (postsApiStatus) {
      case apiStatusConstants.success:
        return this.showPostsSuccessView()
      case apiStatusConstants.failure:
        return this.showPostsFailureView()
      case apiStatusConstants.inProgress:
        return this.showPostsLoadingView()
      default:
        return <p>null</p>
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="home-bg-container">
          <div className="home-responsive-container">
            {this.renderStories()}
            {this.renderPosts()}
          </div>
        </div>
      </>
    )
  }
}
export default Home
