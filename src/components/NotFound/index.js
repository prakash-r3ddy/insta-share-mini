import './index.css'

const NotFound = props => {
  const onClickGoHome = () => {
    const {history} = props
    history.replace('/')
  }

  return (
    <div className="not-found-container">
      <img
        src="https://res.cloudinary.com/dciu5crui/image/upload/v1655544603/insta%20share%20mini%20project/erroring_1not-found_alanvt.png"
        alt="page not found"
        className="not-found-image"
      />
      <h1 className="not-found-heading">PAGE NOT FOUND</h1>
      <p className="not-found-text">
        we are sorry, the page you requested could not be found
      </p>
      <button type="button" onClick={onClickGoHome} className="go-home-button">
        Home Page
      </button>
    </div>
  )
}

export default NotFound
