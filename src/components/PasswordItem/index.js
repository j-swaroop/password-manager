import "./index.css"

const starsImg = "https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
const altText = "stars"

const PasswordItem = (props) => {
    const {passwordItem, showPassword, deletePassword} = props
    const {id, websiteInput, userName, passwordInput, randomColor} = passwordItem

    const initial = websiteInput[0].toUpperCase()

    let onShowPassword
    if(showPassword === true){
        onShowPassword = (<p> {passwordInput} </p>)
    }else{
        onShowPassword = (
            <img className="stars" src={starsImg} alt={altText}/>
        )
    }

    const toDeletePassword = () => {
        deletePassword(id)
    }

    return(
        <li className="password-item"> 
            <div className={`initial-container ${randomColor}`}>
                <p> {initial}</p>
            </div>
            <div className="username-website-container">
                <p> {websiteInput}</p>
                <p> {userName} </p>
                {onShowPassword}
            </div>
            <button data-testid="delete" onClick={toDeletePassword} type="button">
                <img className="delete-img" alt="delete"
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"/>
            </button>
        </li>
    )
}

export default PasswordItem