function fetchData() {
    fetch("http://localhost:3000/accounts")
        .then(function (response) {
        return response.json();
        })
        .then(function (data) {
        state.loginData = data;
        })
        .then(function(){
            fetch("http://localhost:3000/characters")
                .then(function (response) {
                return response.json();
                })
                .then(function (data) {
                state.characterData = data;
                })
        });
}

fetchData()

function showPasswordCreate() {
    let x = document.getElementById("password");
    let y = document.getElementById("passwordConfirm")
    if (x.type === "password") {
        x.type = "text";
        y.type = "text";
    } else {
        x.type = "password";
        y.type = "password";
    }
}

let state = {
    loginData: [],
    characterData: [],
    loginID: 0,
    changes: 0
};

function create() {
    event.preventDefault()
    let usernameInput = document.querySelector("#username").value
    let passwordInput = document.querySelector("#password").value
    let passwordConfirmInput = document.querySelector("#passwordConfirm").value
    if (passwordConfirmInput === passwordInput) {
        let usernameTaken = false
        for(let i = 0; i < state.loginData.length; i++) {
            if (usernameInput === state.loginData[i].username) {
                document.getElementById("createOutcome").innerHTML = "That username is taken"
                usernameTaken = true
                break
            }
        }
        if (usernameTaken === false) {
            let newUser = new Object
            let highestId = 0
            for(let i = 0; i < state.loginData.length; i++) {
                if(state.loginData[i].id > highestId) {
                    highestId = state.loginData[i].id
                };
            }
            if(state.loginData.length === highestId) {
                newUser.id = state.loginData.length + 1
            } else {
                for(let j = 0; j < highestId; j++) {
                    if(state.loginData[j] === undefined) {
                        newUser.id = j
                    } else if(state.loginData[j].loggedIn === true) {
                    state.loginID = state.loginData[j].id
                    indexCaller = j
                    userLoggedIn = true
                    break 
                    }
                }
            }
            newUser.username = usernameInput
            newUser.password = passwordInput
            newUser.characterId = state.loginData.length + 1
            newUser.loggedIn = true

            fetch("http://localhost:3000/accounts", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            })
            .then(function() {
                document.getElementById("logInForm").innerHTML = "Creation Successful! Redirecting..."
                location.replace("./myCharacterProfile.html")
            })
        }
    } else {
        document.getElementById("createOutcome").innerHTML = "Your passwords must match"
    }
};
