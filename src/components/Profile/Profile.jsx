import { useState } from "react";
import { useEffect } from "react";
import CharacterCreateArea from "./CharacterCreateArea";
import CharacterDisplayArea from "./CharacterDisplayArea";

import "../../css/styles.css"
import { Navigate } from "react-router";

const Profile = (props) => {

    const { loginID, characterData } = props

    const [characterMade, setCharacterMade] = useState(false)
    let [characterArray, setCharacterArray] = useState(0)
    const [createCharacter, setCreateCharacter] = useState(false)

    useEffect(() => {

        function characterCheck() {
            if (loginID > 0) {
                for (let i = 0; i < characterData.length; i++) {
                    if (characterData[i].id === loginID) {
                        setCharacterMade(true)
                        setCharacterArray(i)
                        break
                    } else {
                        setCharacterMade(false)
                    }
                }
            }
        }

        characterCheck()

    }, [characterData, loginID])

    const handleLogOut = () => {
        let address = "http://localhost:3000/accounts/" + loginID
        fetch(address, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "loggedIn": false })
        })
            .then(function () {
                window.location.replace("/")
            })
    }

    const handleDeleteAccount = () => {
        let address = "http://localhost:3000/accounts/" + loginID
        fetch(address, {
            method: "DELETE",
        })
            .then(function () {
                address = "http://localhost:3000/characters/" + loginID
                fetch(address, {
                    method: "DELETE",
                })
            })
            .then(function () {
                window.location.reload()
            })
    }

    const handleCreateButton = () => {
        setCreateCharacter(true)
    }

    return (
        <main className="profilePage">
            <script src="../../js/profileJS.js"></script>
            <div className="buttons">
                {loginID > 0 && (
                    <>
                        <button onClick={() => handleLogOut()}>Log Out</button>
                        <button onClick={() => handleDeleteAccount()}>Delete Account</button>
                    </>
                )}
                {characterMade === false && loginID > 0 && createCharacter === false && (
                    <button onClick={handleCreateButton}>Create My Character</button>
                )}
            </div>

            {characterMade === false && (
                <h2>Please Create a Character to View Your Profile</h2>
            )}

            {characterMade === true && (
                <>
                    <h1>My Character</h1>
                    < CharacterDisplayArea
                        characterData={characterData}
                        characterArray={characterArray}
                        loginID={loginID}
                    />
                </>
            )}

            {createCharacter === true && (
                < CharacterCreateArea loginID={loginID} />
            )}
        </main>
    )

}

export default Profile;