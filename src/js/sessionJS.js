let state = {
  loginData: [],
  characterData: [],
  loginID: 0,
  changes: 0
};

let indexCaller = 0

function determineID() {
  let highestId = 0
  for (let i = 0; i < state.loginData.length; i++) {
    if (state.loginData[i].id > highestId) {
      highestId = state.loginData[i].id
    };
  }
  for (let j = 0; j < highestId; j++) {
    if (state.loginData[j] === undefined) {

    } else if (state.loginData[j].loggedIn === true) {
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
    })
    .then(function () {
      fetch("http://localhost:3000/characters")
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          state.characterData = data;
          console.log(state.characterData)
        })
        .then(function () {
          determineID()
        });
    });
}

function testLogin() {
  if (state.loginID === 0) {
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
  renderHealth()
  renderWeapons()
  renderProficiencies()
  renderSpellSlots()
}

fetchData()

let num = "";
let numInt = "";

function getRandomTwenty() {
  num = Math.random() * (20 - 1) + 1;
  numInt = num.toFixed(0);
  return numInt
}

function getRandomTwelve() {
  num = Math.random() * (12 - 1) + 1;
  numInt = num.toFixed(0);
  return numInt
}

function getRandomTen() {
  num = Math.random() * (10 - 1) + 1;
  numInt = num.toFixed(0);
  return numInt
}

function getRandomEight() {
  num = Math.random() * (8 - 1) + 1;
  numInt = num.toFixed(0);
  return numInt
}

function getRandomSix() {
  num = Math.random() * (6 - 1) + 1;
  numInt = num.toFixed(0);
  return numInt
}

function getRandomFour() {
  num = Math.random() * (4 - 1) + 1;
  numInt = num.toFixed(0);
  return numInt
}

function getRandomPercent() {
  num = Math.random() * (100 - 1) + 1;
  numInt = num.toFixed(0);
  return numInt
}

const dice = {
  D4: [1, 2, 3, 4],
  D6: [1, 2, 3, 4, 5, 6],
  D8: [1, 2, 3, 4, 5, 6, 7, 8],
  D10: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  D12: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  D20: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
}

function doRoll(diceArray) {
  return 1 + Math.floor(Math.random() * diceArray.length)
}

function rollDice(myDice) {
  console.log(myDice)
  const myValue = doRoll(dice[`${myDice}`]);
  document.getElementById("diceRollOutcome").innerHTML = myValue
}

function attackRoll(myDice) {
  const myValue = doRoll(dice["D20"]);
  if (myValue === 20) {
    document.getElementById("hitRollOutcome").innerHTML = "Critical hit!"
  } else if (myValue === 1) {
    document.getElementById("hitRollOutcome").innerHTML = "Critical miss!"
  } else {
    document.getElementById("hitRollOutcome").innerHTML = myValue
  }

  if (myDice === "twoSix") {
    let sixOne = doRoll(dice[`D6`])
    let sixTwo = doRoll(dice[`D6`])
    let combined = sixOne + sixTwo
    document.getElementById("attackRollOutcome").innerHTML = combined
  } else {
    const myHit = doRoll(dice[`${myDice}`]);
    document.getElementById("attackRollOutcome").innerHTML = myHit
  }
}





function renderHealth() {
  if (state.loginID === 0) {
    document.querySelector(".healthValue").innerHTML = 0
  } else {
    document.querySelector(".healthValue").innerHTML = state.characterData[indexCaller].hp
  }
}

function healthPlusOne() {
  document.querySelector(".healthValue").classList.add("plusOneAnimating")
  setTimeout(function () { document.querySelector(".healthValue").classList.remove("plusOneAnimating") }, 550);
  healthChange(1)
}

function healthPlusTen() {
  document.querySelector(".healthValue").classList.add("plusTenAnimating")
  setTimeout(function () { document.querySelector(".healthValue").classList.remove("plusTenAnimating") }, 1500);
  healthChange(10)
}

function healthMinusTen() {
  document.querySelector(".healthValue").classList.add("minusTenAnimating")
  setTimeout(function () { document.querySelector(".healthValue").classList.remove("minusTenAnimating") }, 1550);
  healthChange(-10)
}

function healthMinusOne() {

  document.querySelector(".healthValue").classList.add("minusOneAnimating")
  setTimeout(function () { document.querySelector(".healthValue").classList.remove("minusOneAnimating") }, 550);
  healthChange(-1)
}

function healthChange(change) {
  event.preventDefault
  let indexCaller2 = indexCaller + 1
  let address = "http://localhost:3000/characters/" + indexCaller2

  fetch(address)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      state.characterData = data;
      healthChangeCalculator(change)
    });
}

function healthChangeCalculator(change) {
  console.log(state.characterData)
  let currentHealth = state.characterData.hp + change
  let indexCaller2 = indexCaller + 1
  let address = "http://localhost:3000/characters/" + indexCaller2
  fetch(address, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ "hp": currentHealth })
  })
    .then(function () {
      renderHealth()
    })
}

function renderWeapons() {
  let weaponsArea = document.getElementById("weaponsArea")

  if (state.loginID > 0) {
    if (state.characterData[indexCaller].weapons !== undefined) {
      for (let i = 0; i < state.characterData[indexCaller].weapons.length; i++) {
        let currentWeapon = JSON.stringify(state.characterData[indexCaller].weapons[i])
        currentWeapon = currentWeapon.replaceAll("{", "")
        currentWeapon = currentWeapon.replaceAll("}", "")
        currentWeapon = currentWeapon.replaceAll('"', "")
        currentWeapon = currentWeapon.replaceAll("Name:", "")
        currentWeapon = currentWeapon.replaceAll("Damage:", ": ")
        currentWeapon = currentWeapon.replaceAll(",", " ")
        let characterWeapon = document.createElement("li")
        characterWeapon.innerText = currentWeapon
        weaponsArea.append(characterWeapon)
      }
    } else {
      let logInMessage = document.createElement("p")
      logInMessage.innerText = "Please add some weapons to your character in the profile page"
      weaponsArea.append(logInMessage)
    }
  } else {
    let logInMessage = document.createElement("p")
    logInMessage.innerText = "Please log in to see your weapons"
    weaponsArea.append(logInMessage)
  }
}

function renderSpellSlots() {
  if (state.loginID != 0) {
    if (state.characterData[indexCaller].spellSlots != undefined) {
      let characterSpellSlotArea = document.getElementById("characterSpellSlotArea")
      for (let j = 0; j < 20; j++) {

        let currentSpellSlot = JSON.stringify(state.characterData[indexCaller].spellSlots[j])
        console.log(currentSpellSlot)
        currentSpellSlot = currentSpellSlot.replaceAll("{", "")
        currentSpellSlot = currentSpellSlot.replaceAll("}", "")
        currentSpellSlot = currentSpellSlot.replaceAll('"', "")
        currentSpellSlot = currentSpellSlot.replaceAll(",", " ")
        currentSpellSlot = currentSpellSlot.substring(currentSpellSlot.indexOf(":") + 1)
        let characterSpellSlot = document.createElement("p")
        characterSpellSlot.innerText = currentSpellSlot
        characterSpellSlotArea.append(characterSpellSlot)

      }
    } else {
      let characterSpellSlotArea = document.getElementById("characterSpellSlotArea")
      characterSpellSlotArea.innerText = "Please add some Spell Slots in the profile menu"
    }
  } else {
    let characterSpellSlotArea = document.getElementById("characterSpellSlotArea")
    characterSpellSlotArea.innerText = "Please log in to see your Spell Slots"
  }

}

function renderProficiencies() {
  let proficiencyArea = document.getElementById("proficiencyArea")

  if (state.loginID > 0) {
    if (state.characterData[indexCaller].proficiencies !== undefined) {
      for (let i = 0; i < state.characterData[indexCaller].proficiencies.length; i++) {
        let currentProficiency = JSON.stringify(state.characterData[indexCaller].proficiencies[i])
        currentProficiency = currentProficiency.replaceAll('"', "")
        let characterProficiency = document.createElement("li")
        characterProficiency.innerText = currentProficiency
        proficiencyArea.append(characterProficiency)
      }
    } else {
      let logInMessage = document.createElement("p")
      logInMessage.innerText = "Please add some proficiencies to your character in the profile page"
      proficiencyArea.append(logInMessage)
    }
  } else {
    let logInMessage = document.createElement("p")
    logInMessage.innerText = "Please log in to see your proficiencies"
    proficiencyArea.append(logInMessage)
  }
}