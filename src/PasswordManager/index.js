import {Component} from 'react'

import {v4} from 'uuid'

import PasswordItem from '../PasswordItem'

import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class PasswordManager extends Component {
  state = {
    nameInput: '',
    search: '',
    passwordInput: '',
    websiteInput: '',
    isShow: false,
    passwordList: [],
  }

  deletePassword = passId => {
    const {passwordList} = this.state
    this.setState({
      passwordList: passwordList.filter(each => each.id !== passId),
    })
  }

  toggleIsLiked = id => {
    this.setState(prevState => ({
      passwordList: prevState.passwordList.map(eachPass => {
        if (id === eachPass.id) {
          return {...eachPass, isLiked: !eachPass.isLiked}
        }
        return eachPass
      }),
    }))
  }

  onAddPassword = event => {
    event.preventDefault()
    const {nameInput, passwordInput, websiteInput} = this.state
    const initialBackgroundColorClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`
    const newPass = {
      id: v4(),
      name: nameInput,
      password: passwordInput,
      website: websiteInput,
      initialClassName: initialBackgroundColorClassName,
    }
    this.setState(prevState => ({
      passwordList: [...prevState.passwordList, newPass],
      nameInput: '',
      passwordInput: '',
      websiteInput: '',
    }))
  }

  onChangePasswordInput = event => {
    this.setState({
      passwordInput: event.target.value,
    })
  }

  onChangeNameInput = event => {
    this.setState({
      nameInput: event.target.value,
    })
  }

  onChangeWebsiteInput = event => {
    this.setState({
      websiteInput: event.target.value,
    })
  }

  onSearchChange = event => {
    this.setState({
      search: event.target.value,
    })
  }

  show = event => {
    this.setState(prevState => ({isShow: !prevState.isShow}))
  }

  render() {
    const {
      nameInput,
      passwordInput,
      websiteInput,
      search,
      isShow,
      passwordList,
    } = this.state
    const list = passwordList.filter(each =>
      each.website.toLowerCase().includes(search.toLowerCase()),
    )
    return (
      <div className="app-container">
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="logo"
          />
        </div>
        <div className="comments-container">
          <div className="comments-inputs">
            <form className="form" onSubmit={this.onAddPassword}>
              <h1 className="app-heading">Add New Password</h1>

              <div className="side">
                <div className="img-form">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png "
                    alt="website"
                    className="form-img"
                  />
                </div>
                <input
                  type="text"
                  className="name-input"
                  placeholder="Enter Website"
                  value={websiteInput}
                  onChange={this.onChangeWebsiteInput}
                />
              </div>

              <div className="side">
                <div className="img-form">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                    alt="username"
                    className="form-img"
                  />
                </div>
                <input
                  type="text"
                  className="name-input"
                  placeholder="Enter Username"
                  value={nameInput}
                  onChange={this.onChangeNameInput}
                />
              </div>
              <div className="side">
                <div className="img-form">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                    alt="password"
                    className="form-img"
                  />
                </div>

                <input
                  type="password"
                  placeholder="Enter Password"
                  className="name-input"
                  value={passwordInput}
                  onChange={this.onChangePasswordInput}
                />
              </div>
              <div className="btn-container">
                <button type="submit" className="add-button">
                  Add
                </button>
              </div>
            </form>
            <img
              className="image"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              alt="password manager"
            />
          </div>
        </div>
        <div className="passwords-container">
          <div className="end">
            <div className="count-container">
              <h1 className="show-passd">Your Passwords</h1>
              <p className="pass-count">{list.length}</p>
            </div>

            <div className="search-container">
              <div className="img-search">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                  className="search-icon"
                />
              </div>
              <input
                type="search"
                value={search}
                onChange={this.onSearchChange}
                className="search-input"
                placeholder="Search"
              />
            </div>
          </div>
          <hr className="line" />
          <div className="endd">
            <input
              type="checkbox"
              onChange={this.show}
              className="show-input"
              id="check"
            />
            <label htmlFor="check" className="show-pass">
              Show passwords
            </label>
          </div>
          {list.length === 0 ? (
            <>
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
                className="image"
              />
              <p className="show-pass">No Passwords</p>
            </>
          ) : (
            <ul className="password-list">
              {list.map(each => (
                <PasswordItem
                  key={each.id}
                  Details={each}
                  isShow={isShow}
                  toggleIsLiked={this.toggleIsLiked}
                  deletePassword={this.deletePassword}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default PasswordManager
