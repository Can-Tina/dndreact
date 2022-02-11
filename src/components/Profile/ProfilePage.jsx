import NavBar from "../NavBar";
import Profile from "./Profile";

import "../../css/styles.css"

import { useState } from "react";

const ProfilePage = (props) => {

    const { loginID, loginData, indexCaller, characterData } = props

    return (
        <>
            <NavBar
                loginID={loginID}
                loginData={loginData}
                indexCaller={indexCaller}
                characterData={characterData}
            />
            <Profile
                loginID={loginID}
                loginData={loginData}
                characterData={characterData}
            />
        </>
    )

}

export default ProfilePage;