import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "../../css/styles.css"

const LogIn = (props) => {

    const { loginData, setLoginID } = props

    const initialFormState = {
        username: "",
        password: ""
    }

    const [showPassword, setShowPassword] = useState(false)
    const [passwordType, setPasswordType] = useState("password")
    const [formState, setFormState] = useState(initialFormState)
    const [logInSuccess, setLogInSuccess] = useState(true)

    const showPasswordF = () => {
        if (showPassword) {
            setPasswordType("password")
            setShowPassword(false)
        } else {
            setPasswordType("text")
            setShowPassword(true)
        }
    }

    const handleChange = (event) => {
        setFormState((previousForm) => ({
            ...previousForm,
            [event.target.id]: event.target.value
        }));
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        let newUser = { ...formState }
        setLogInSuccess(false)
        loginData.map(login => {
            if (newUser.username === login.username && newUser.password === login.password) {
                setLoginID(login.id)
                setLogInSuccess(true)

                let address = "http://localhost:3000/accounts/" + login.id

                fetch(address, {
                    method: "PATCH",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ "loggedIn": true })
                })
                window.location.replace("./")
            }
        })
    }

    return (
        <main className="loginPage">
            <h1>Log in</h1>
            <div id="logInForm">
                <div>
                    <form onSubmit={(event) => handleSubmit(event)}>
                        <label htmlFor="username" className="usernameLabel">Username</label>
                        <input type="text" name="username" id="username" onChange={(event) => handleChange(event)} value={formState.username}></input>
                        <label htmlFor="password" className="passwordLabel">Password</label>
                        <input type={passwordType} name="password" id="password" onChange={(event) => handleChange(event)} value={formState.password}></input>
                        <div>
                            <label htmlFor="showPassword" id="showPasswordLabel">Show Password</label>
                            <input type="checkbox" onClick={() => showPasswordF()} className="showPassword"></input>
                            <input type="submit" name="submitLogin" id="submitLogin"></input>
                            <p id="loginOutcome"></p>
                            <Link to="/create">New to DND Diary? Create an account</Link>
                        </div>
                    </form>
                    {logInSuccess === false && (
                        <p>Your username or password was incorrect</p>
                    )}
                </div>
            </div>
        </main>
    )
}

export default LogIn;