function showPassword() {
    let x = document.getElementById("password");
    let y = document.getElementById("passwordConfirm")
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}

let state = {
    loginData: [],
    characterData: [],
    loginID: 0,
    changes: 0
};

function compareInfo(username, password) {
    let logInSuccess = false
    for (let i = 0; i < state.loginData.length; i++) {
        if (username === state.loginData[i].username && password === state.loginData[i].password) {
            state.loginID = state.loginData[i].id

            let address = "http://localhost:3000/accounts/" + state.loginID
            fetch(address, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "loggedIn": true })
            })

            document.getElementById("logInForm").innerHTML = "Login Successful! Redirecting..."
            logInSuccess = true
            location.replace("./index.html")
            break
        }
    }
    if (logInSuccess === false) {
        document.getElementById("loginOutcome").innerHTML = "Your username or password is incorrect"
    }
}

function getAccounts(username, password) {
    fetch("http://localhost:3000/accounts")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            state.loginData = data;
            compareInfo(username, password)
        });
}

function logIn() {
    event.preventDefault()
    let usernameInput = document.querySelector("#username").value
    let passwordInput = document.querySelector("#password").value
    getAccounts(usernameInput, passwordInput)
}