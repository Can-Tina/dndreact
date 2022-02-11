let state = {
    loginData: [],
    characterData: [],
    loginID: 0,
    changes: 0
};

let indexCaller = 0

function determineID() {
    let highestId = 0
    for(let i = 0; i < state.loginData.length; i++) {
        if(state.loginData[i].id > highestId) {
            highestId = state.loginData[i].id
        };
    }
    for(let j = 0; j < highestId; j++) {
        if(state.loginData[j] === undefined) {

        } else if(state.loginData[j].loggedIn === true) {
        state.loginID = state.loginData[j].id
        indexCaller = j
        userLoggedIn = true
        break 
        }
        
    }
    readyToGo()
}

function fetchData() {
    fetch("http://localhost:3000/accounts")
        .then(function (response) {
        return response.json();
        })
        .then(function (data) {
        state.loginData = data;
        });


    fetch("http://localhost:3000/characters")
    .then(function (response) {
    return response.json();
    })
    .then(function (data) {
    state.characterData = data;
    })
    .then(function() {
    determineID()
    });
}

function testLogin() {
    if(state.loginID === 0) {
        const logInSection = document.querySelector(".logIn")
        const logInLink = document.createElement("a")
        logInLink.innerText = "Log In"
        logInLink.setAttribute("href", "./logIn.html")
        logInSection.append(logInLink)
    } else {
        const logInSection = document.querySelector(".logIn")
        const logInLink = document.createElement("a")
        logInLink.innerText = state.loginData[indexCaller].username
        logInLink.setAttribute("href", "./myCharacterProfile.html")
        logInSection.append(logInLink)
    }
}

function readyToGo() {
    testLogin()
}

fetchData()
