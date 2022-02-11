import { useDebugValue, useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import "../css/styles.css"


const NavBar = (props) => {

    const { loginID, loginData, indexCaller, characterData } = props

    const [barData, setBarData] = useState("")
    const [barLink, setBarLink] = useState("")

    console.log(characterData[indexCaller])

    useEffect(() => {

        function testLogin() {

            if (loginID === 0) {
                setBarData("Log In")
                setBarLink("/login")
            } else {
                let username = loginData[indexCaller].username
                setBarData(username)
                setBarLink("/profile")
            }
        }
        testLogin()

    }, [loginID, loginData, indexCaller])

    return (
        <nav>
            <div className="logo">
                <Link to="/" className="logoCapital">DND</Link>
                <br></br>
                <Link to="/" className="logoSub">Diary</Link>
            </div>
            <div className="blank"></div>
            <div className="home">
                <Link to="/">Home</Link>
            </div>
            <div className="session">
                {characterData[indexCaller] !== undefined && loginID > 0 && (
                    <Link to="/session">Session Time</Link>
                )}
            </div>
            <div className="profile">
                {loginID > 0 && (
                    <Link to="/profile">My Profile</Link>
                )}
            </div>
            <div className="blank2"></div>
            <div className="logIn">
                <Link to={barLink}>{barData}</Link>
            </div>
        </nav>
    )

}

export default NavBar;