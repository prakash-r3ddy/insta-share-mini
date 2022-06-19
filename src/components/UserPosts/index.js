import {Component} from 'react'
import {FaRegComment} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import {BiShareAlt} from 'react-icons/bi'
import {BsHeart, BsFillHeartFill} from 'react-icons/bs'

import './index.css'

class UserPosts extends Component {
  state = {
    isLiked: false,
  }

  changeLikeStatus = () => {
    this.setState(prevState => ({isLiked: !prevState.isLiked}))
  }

  render() {
    const {userPostDetails} = this.props
    const {
      comments,
      createdAt,
      likesCount,
      postDetails,
      postId,
      profilePic,
      userId,
      userName,
    } = userPostDetails
    const {isLiked} = this.state

    const likeButton = isLiked ? (
      <button
        type="button"
        className="like-icon-container"
        testid="likeIcon"
        onClick={this.changeLikeStatus}
      >
        <BsFillHeartFill className="like-icon" />
      </button>
    ) : (
      <button
        type="button"
        testid="unLikeIcon"
        className="like-icon-container"
        onClick={this.changeLikeStatus}
      >
        <BsHeart className="unlike-icon" />
      </button>
    )

    return (
      <li className="post-list-item">
        <div className="userProfile-name-container">
          <div className="profile-pic-post-container">
            <img
              src={profilePic}
              alt="post author profile"
              className="post-profile-image"
            />
          </div>
          <Link to={`users/${userId}`} className="link-item">
            {' '}
            <p className="post-profile-name">{userName}</p>
          </Link>
        </div>
        <img src={postDetails.imageUrl} alt="post" className="post-image" />
        <div className="like-share-comment-icons-container">
          {likeButton}
          <FaRegComment className="post-interaction-icons" />
          <BiShareAlt className="post-interaction-icons" />
        </div>
        <div className="likes-comments-container">
          <p className="post-total-likes">{likesCount} likes</p>
          <p className="post-caption">{postDetails.caption}</p>
          <ul className="post-comments-container">
            {comments.map(eachComment => (
              <li className="list-item" key={eachComment.userId}>
                <p className="comment-user-name">{eachComment.userName}</p>
                <p className="user-comment">{eachComment.comment}</p>
              </li>
            ))}
          </ul>
          <p className="post-time">{createdAt}</p>
        </div>
      </li>
    )
  }
}

export default UserPosts
