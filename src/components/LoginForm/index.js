import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showErrorMsg: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitDetails = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const loginUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(loginUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      const {history} = this.props
      const jwtToken = data.jwt_token
      Cookies.set('jwt_token', jwtToken, {expires: 30})
      history.replace('/')
    } else {
      const errorMessage = data.error_msg
      this.setState({showErrorMsg: true, errorMsg: errorMessage})
    }
  }

  render() {
    const {username, password, showErrorMsg, errorMsg} = this.state

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-form-container">
        <div className="responsive-login-form-container">
          <img
            src="https://res.cloudinary.com/dciu5crui/image/upload/v1655187884/insta%20share%20mini%20project/Layer_2loginImg_ultjrm.png"
            alt="website login"
            className="login-form-responsive-image"
          />
          <div className="login-details-container">
            <img
              src="https://res.cloudinary.com/dciu5crui/image/upload/v1655187898/insta%20share%20mini%20project/Standard_Collection_8app_logo_y7uc7i.png"
              alt="website logo"
              className="login-form-app-logo"
            />
            <h1 className="app-name-heading">Insta Share</h1>
            <form className="form-container" onSubmit={this.onSubmitDetails}>
              <label className="label-text" htmlFor="username">
                USERNAME
              </label>
              <input
                type="text"
                className="login-input-element"
                id="username"
                onChange={this.onChangeUsername}
                value={username}
                placeholder="USERNAME"
              />
              <label className="label-text" htmlFor="password">
                PASSWORD
              </label>
              <input
                type="password"
                id="password"
                className="login-input-element"
                onChange={this.onChangePassword}
                value={password}
                placeholder="password"
              />
              <button type="submit" className="login-button">
                Login
              </button>

              {showErrorMsg && <p className="error-msg">{errorMsg}</p>}
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default LoginForm
