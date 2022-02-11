import { useState } from "react";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import HomePage from "./components/Index/HomePage"
import SessionPage from "./components/Session/SessionPage"
import ProfilePage from "./components/Profile/ProfilePage";
import LogIn from "./components/LogIn/LogIn"
import CreateAccount from "./components/CreateAccount/CreateAccount";

function App() {

  const [loginData, setLoginData] = useState([])
  const [characterData, setCharacterData] = useState([])
  const [loginID, setLoginID] = useState(0)
  const [indexCaller, setIndexCaller] = useState(0)

  useEffect(() => {

    function fetchData() {
      fetch("http://localhost:3000/accounts")
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          setLoginData(data);
        })
        .then(function () {
          fetch("http://localhost:3000/characters")
            .then(function (response) {
              return response.json();
            })
            .then(function (data) {
              setCharacterData(data);
            })
        });
    }
    fetchData()
  }, [])

  useEffect(() => {

    function determineID() {
      let highestId = 0
      for (let i = 0; i < loginData.length; i++) {
        if (loginData[i].id > highestId) {
          highestId = loginData[i].id
        };
      }
      for (let j = 0; j < highestId; j++) {
        if (loginData[j] === undefined) {
        } else if (loginData[j].loggedIn === true) {
          setLoginID(loginData[j].id)
          setIndexCaller(j)
          break
        }
      }
    }
    determineID()
  }, [loginData, indexCaller])

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<HomePage
            loginID={loginID}
            loginData={loginData}
            indexCaller={indexCaller}
            characterData={characterData}
          />}
        />
        <Route
          path="/session"
          element={<SessionPage
            loginID={loginID}
            loginData={loginData}
            indexCaller={indexCaller}
            characterData={characterData}
          />}
        />
        <Route
          path="/profile"
          element={<ProfilePage
            loginID={loginID}
            loginData={loginData}
            indexCaller={indexCaller}
            characterData={characterData}
          />}
        />
        <Route
          path="/login"
          element={<LogIn
            loginID={loginID}
            loginData={loginData}
            indexCaller={indexCaller}
            setLoginID = {setLoginID}
            characterData={characterData}
          />}
        />
        <Route
          path="/create"
          element={<CreateAccount
            loginID={loginID}
            loginData={loginData}
            indexCaller={indexCaller}
            setLoginID = {setLoginID}
            characterData={characterData}
          />}
        />
      </Routes>
    </>

  );
}

export default App;
