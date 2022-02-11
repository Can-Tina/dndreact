import NavBar from "../NavBar";
import Home from "./Home";
import HomeAside from "./HomeAside";

import "../../css/styles.css"

import { useState } from "react";

const SessionPage = (props) => {

    const { loginID, loginData, indexCaller, characterData} = props

    return (
        <>
            <NavBar
                loginID={loginID}
                loginData={loginData}
                indexCaller={indexCaller}
                characterData={characterData}
            />
            <HomeAside />
            <Home />
        </>
    )

}

export default SessionPage;