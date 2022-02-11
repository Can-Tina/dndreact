import { useState, useEffect } from "react";

import "../../css/styles.css"

const CreateAccount = (props) => {

    const { loginData, setLoginID } = props

    const initialFormState = {
        username: "",
        password: "",
        passwordConfirm: ""
    }

    const [showPassword, setShowPassword] = useState(false)
    const [passwordType, setPasswordType] = useState("password")
    const [formState, setFormState] = useState(initialFormState)
    const [usernameTaken, setUsernameTaken] = useState(false)
    const [passwordNotMatch, setPasswordNotMatch] = useState(false)

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
        console.log(newUser)
        setUsernameTaken(false)
        setPasswordNotMatch(false)
        if (newUser.password === newUser.passwordConfirm) {
            let takeUsername = false

            for(let i = 0; i < loginData.length; i++) {
                if (newUser.username === loginData[i].username) {
                    setUsernameTaken(true)
                    takeUsername = true
                    break
                }
            }

            if (takeUsername === false) {
                let highestId = 0
                loginData.map(login => {
                    if (login.id > highestId) {
                        highestId = login.id
                    }
                })
                if (loginData.length === highestId) {
                    newUser.id = loginData.length + 1
                } else {
                    for (let j = 0; j < highestId; j++) {
                        if (loginData[j] === undefined) {
                            newUser.id = j
                        }
                    }
                }

                setLoginID(newUser.id)

                let userToCreate = {}
                userToCreate.id = newUser.id
                userToCreate.username = newUser.username
                userToCreate.password = newUser.password
                userToCreate.characterId = newUser.id
                userToCreate.loggedIn = true

                fetch("http://localhost:3000/accounts", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(userToCreate)
                })
                .then(function() {
                    window.location.replace("./profile")
                })
                console.log("false")
            }
        } else {
            setPasswordNotMatch(true)
        }

    }

    return (
        <main className="createPage">
            <h1>Create an account</h1>
            <div id="logInForm">
                <div>
                    <form onSubmit={(event) => handleSubmit(event)}>
                        <label htmlFor="username" className="usernameLabel">Create a Username</label>
                        <input type="text" name="username" id="username" onChange={(event) => handleChange(event)} value={formState.username}></input>
                        <label htmlFor="password" className="passwordLabel">Create a Password</label>
                        <input type={passwordType} name="password" id="password" onChange={(event) => handleChange(event)} value={formState.password}></input>
                        <label htmlFor="passwordConfirm" className="passwordLabel">Confirm Password</label>
                        <input type={passwordType} name="passwordConfirm" id="passwordConfirm" onChange={(event) => handleChange(event)} value={formState.passwordConfirm}></input>
                        <div>
                            <label htmlFor="showPassword" id="showPasswordLabel">Show Password</label>
                            <input type="checkbox" onClick={() => showPasswordF()} className="showPassword"></input>
                        </div>
                        <input type="submit" name="submitCreate" id="submitCreate"></input>
                        {usernameTaken === true && (
                            <p>That username is taken</p>
                        )}
                        {passwordNotMatch === true && (
                            <p>The passwords do not match</p>
                        )}
                    </form>
                </div>
                <div id="logInImage">
                    <p className="taglineOne">Your Journey</p>
                    <p className="taglineTwo">Awaits</p>
                </div>
            </div>
        </main>
    )

}

export default CreateAccount;