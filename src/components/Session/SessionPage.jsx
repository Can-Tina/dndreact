import NavBar from "../NavBar";
import Session from "./Session";
import SessionAside from "./SessionAside";

import "../../css/styles.css"

import { useState } from "react";

const SessionPage = (props) => {

    const { loginID, loginData, indexCaller, characterData } = props

    return (
        <>
            <NavBar
                loginID={loginID}
                loginData={loginData}
                indexCaller={indexCaller}
                characterData={characterData}
            />
            <SessionAside />
            <Session
                loginID={loginID}
                loginData={loginData}
                indexCaller={indexCaller}
                characterData={characterData}
            />
        </>
    )

}

export default SessionPage;