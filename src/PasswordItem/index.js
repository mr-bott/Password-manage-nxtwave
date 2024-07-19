import './index.css'

const PasswordItem = props => {
  const {Details, isShow} = props
  const {id, name, password, website, initialClassName} = Details
  const initial = website ? website[0].toUpperCase() : ''

  const onDeleteComment = () => {
    const {deletePassword} = props
    deletePassword(id)
  }

  return (
    <li className="comment-item">
      <div className={initialClassName}>
        <p className="initial">{initial}</p>
      </div>

      <div className="name-parent">
        <div className="username-time-container">
          <p className="website">{website}</p>
          <p className="username">{name}</p>
        </div>
        <div className="password">
          {isShow ? (
            <p className="comment">{password}</p>
          ) : (
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
              alt="stars"
              className="delete-stars"
            />
          )}
        </div>
      </div>

      <div className="buttons-container">
        <button
          className="button"
          type="button"
          onClick={onDeleteComment}
          data-testid="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
            className="delete"
            alt="delete"
          />
        </button>
      </div>
    </li>
  )
}
export default PasswordItem
