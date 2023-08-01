import {Component} from "react"
import "./index.css"
import {v4} from "uuid"
import PasswordItem from "../PasswordItem"


const randomBackgroundColors = [
    "green", "orange", "light-green", "dark-orange", "red", "blue"
]



class PasswordManager extends Component{
    state = {
        passwordList: [],
        websiteInput: "",
        userName: "",
        passwordInput: "",
        searchInput: "",
        showPassword: false
    }


    toShowPasswords = () => {
        this.setState(prevState => ({showPassword: !prevState.showPassword}))
    }

    onChageSearchInput = (event) => {
        this.setState({searchInput: event.target.value})
    }

    deletePassword = (id) => {
        this.setState(prevState => ({
            passwordList: prevState.passwordList.filter(eachPassword => {
                if (eachPassword.id !== id){
                    return {eachPassword}
                }
            })
        }))
    }


    renderPasswordList = () => {
        const {passwordList, showPassword, searchInput} = this.state 

        const searchResults = passwordList.filter(eachPassword => eachPassword.websiteInput.toLowerCase().includes(searchInput.toLowerCase()))
        
        
        return(
                <ul className="passwords-list"> 
                    {searchResults.map(eachPassword => <PasswordItem deletePassword={this.deletePassword}
                        showPassword={showPassword} passwordItem={eachPassword} key={eachPassword.id}/>)}
                </ul>
            )

    }

    renderNoPasswordsImg = () => {
        const {passwordList, searchInput} = this.state 

        const searchResults = passwordList.filter(eachPassword => eachPassword.websiteInput.toLowerCase().includes(searchInput.toLowerCase()))
        

        if (passwordList.length === 0 || searchResults.length === 0){
            return(
                <>
                <img className="no-passwords-img" alt="no passwords" 
                    src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png" />
                <p className="h"> No Passwords</p>    
                </>
            )
        }
    }

    renderBottomContainer = () => {
        const {searchInput, passwordList} = this.state

        return(
            <div className="bottom-container-body">

                <div className="passwords-count-search-bar-container">
                    <div className="password-count-container">
                        <h1 className="your-password-heading"> Your Passwords </h1>
                        <p className="span"> {passwordList.length}</p>
                    </div>
                    <div className="search-container">
                        <label htmlFor="search">
                            <img className="input-logos" alt="search"
                            src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"/>
                        </label>
                        <input onChange={this.onChageSearchInput} value={searchInput} 
                            className="search" placeholder="Search" id="search" type="search"/>
                    </div>
                </div>

                <hr className="hr-line"/>
                <div className="checkbpx-container">
                    <input onClick={this.toShowPasswords} id="checkBox" type="checkbox"/> 
                    <label className="checkbox-text" htmlFor="checkBox"> Show Passwords </label>
                </div>

                {this.renderNoPasswordsImg()}
                {this.renderPasswordList()}
            </div>
        )
    }


    onChangeWebsiteInput = (event) => {
        this.setState({websiteInput: event.target.value})
    }

    onChangeUserNameInput = (event) => {
        this.setState({userName: event.target.value})
    }

    onChangePasswordInput = (event) => {
        this.setState({passwordInput: event.target.value})
    }


    onSubmitForm = (event) => {
        event.preventDefault()

        const {passwordList, userName, websiteInput, passwordInput} = this.state

        const randomBg = Math.ceil(Math.random() * randomBackgroundColors.length - 1)

        if(websiteInput !== "" && userName !== "" && passwordInput !== ""){
            let newPassword = {
                id: v4(),
                userName: userName,
                websiteInput: websiteInput,
                passwordInput: passwordInput,
                randomColor: randomBackgroundColors[randomBg]
            }

            this.setState(prevState => ({
                passwordList: [...prevState.passwordList, newPassword],
                websiteInput: "",
                userName: "",
                passwordInput: ""
            }))
        }

    }

    renderTopContainer = () => {
        const {passwordList, userName, websiteInput, passwordInput} = this.state

        return(
            <div className="top-container-body">
                <form onSubmit={this.onSubmitForm} className="form-container">
                    <h1 className="add-password-heading"> Add New Password</h1>
                    <div className="input-container">
                        <label htmlFor="website">
                            <img className="input-logos" alt="website"
                            src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"/>
                        </label>
                        <input value={websiteInput} onChange={this.onChangeWebsiteInput} placeholder="Enter Website" id="website" type="text"/>
                    </div>

                    <div className="input-container">
                        <label htmlFor="userName">
                            <img className="input-logos" alt="username"
                            src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"/>
                        </label>
                        <input value={userName} onChange={this.onChangeUserNameInput} placeholder="Enter Username" id="userName" type="text"/>
                    </div>

                    <div className="input-container">
                        <label htmlFor="password">
                            <img className="input-logos" alt="password"
                            src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"/>
                        </label>
                        <input value={passwordInput} onChange={this.onChangePasswordInput} placeholder="Enter Password" id="password" type="password"/>
                    </div>
                    <button type="submit" className="add-button"> Add</button>
                </form>

                <div className="top-container-image">
                    <img alt="password manager" className="password-manager-img" 
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"/>
                </div>

                <div className="top-container-image-sm">
                    <img alt="password manager" className="password-manager-img" 
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"/>
                </div>

            </div>
        )
    }


    //main
    render(){
        return(
            <div className="bg-container">
                <div className="body-container">
                    <img className="app-logo" alt="app logo" 
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png" />
                    
                    <div className="top-container">
                        {this.renderTopContainer()}
                    </div>

                    <div className="bottom-container">
                        {this.renderBottomContainer()}
                    </div>
                </div>
            </div>
        )
    }
}

export default PasswordManager