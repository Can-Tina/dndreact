let state = {
    loginData: [],
    characterData: [],
    loginID: 0,
    changes: 0
};

let indexCaller = 0

/*function determineID() {
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
                })
                .then(function () {
                    determineID()
                });
        });
}
*/
/*
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



function characterCheck() {
    if (state.loginID > 0) {
        let buttonArea = document.querySelector(".buttons")
        let characterMade = false
        let characterArray = ""
        for (let i = 0; i < state.characterData.length; i++) {
            if (state.characterData[i].id === state.loginID) {
                characterMade = true
                characterArray = i
                break
            } else {
                characterMade = false
            }
        }
        if (characterMade === false) {
            let createCharacter = document.createElement("button")
            createCharacter.innerText = "Create My Character"
            buttonArea.append(createCharacter)
            createCharacter.onclick = function () {
                buttonArea.removeChild(createCharacter)
                createUserCharacter()
            }




        } else {
            /*let stateId = characterArray
            let titleArea = document.getElementById("myCharacterTitle")
            titleArea.innerHTML = "My Character"

            let characterArea = document.getElementById("characterDisplayArea")

            let characterName = document.createElement("h2")
            characterName.innerText = state.characterData[stateId].name
            characterArea.append(characterName)

            let characterContent = document.createElement("div")
            characterContent.classList.add("characterContent")
            characterArea.append(characterContent)

            let characterInfo = document.createElement("ul")
            characterInfo.classList.add("characterInfo")
            characterContent.append(characterInfo)

            let factsArray = ["Race", "Class", "Level", "Hp"]

            for (let i = 0; i < factsArray.length; i++) {
                let attribute = factsArray[i].toLowerCase()
                variableName = document.createElement('li')
                variableName.innerText = factsArray[i] + ": " + state.characterData[stateId][attribute]
                characterInfo.append(variableName)
            }

            let characterAttributes = document.createElement("ul")
            characterAttributes.classList.add("characterAttributes")
            characterContent.append(characterAttributes)

            let attributesArray = ["Strength", "Dexterity", "Wisdom", "Constitution", "Intelligence", "Charisma"]

            for (let i = 0; i < attributesArray.length; i++) {
                let attribute = attributesArray[i].toLowerCase()
                variableName = document.createElement('li')
                variableName.innerText = attributesArray[i] + ": " + state.characterData[stateId].attributes[attribute]
                characterAttributes.append(variableName)
            }

            let characterProficienciesDisplay = document.createElement("ul")
            characterProficienciesDisplay.classList.add("characterProficienciesDisplay")
            characterArea.append(characterProficienciesDisplay)

            let characterProficienciesTitle = document.createElement("li")
            characterProficienciesTitle.classList.add("characterProficienciesTitle")
            characterProficienciesTitle.innerText = "Proficiencies: "
            characterProficienciesDisplay.append(characterProficienciesTitle)

            let characterProficienciesBlank = document.createElement("li")
            characterProficienciesDisplay.append(characterProficienciesBlank)

            for (let j = 0; j < state.characterData[stateId].proficiencies.length; j++) {
                let itemName = "character" + state.characterData[stateId].proficiencies[j]
                let itemNameNoSpace = itemName.replaceAll(" ", "")
                let proficiency = document.createElement("li")
                proficiency.classList.add(itemNameNoSpace)
                proficiency.innerText = state.characterData[stateId].proficiencies[j]
                characterProficienciesDisplay.append(proficiency)
            }

            let characterWeaponsArea = document.getElementById("characterWeaponArea")
            let characterWeaponsTitle = document.createElement("h2")
            characterWeaponsTitle.innerText = "Weapons"
            characterWeaponsArea.append(characterWeaponsTitle)

            if (state.characterData[characterArray].weapons != undefined) {
                for (let j = 0; j < state.characterData[characterArray].weapons.length; j++) {
                    let currentWeapon = JSON.stringify(state.characterData[characterArray].weapons[j])
                    currentWeapon = currentWeapon.replaceAll("{", "")
                    currentWeapon = currentWeapon.replaceAll("}", "")
                    currentWeapon = currentWeapon.replaceAll('"', "")
                    currentWeapon = currentWeapon.replaceAll("Name:", "")
                    currentWeapon = currentWeapon.replaceAll("Damage:", ": ")
                    currentWeapon = currentWeapon.replaceAll(",", " ")
                    let characterWeapon = document.createElement("li")
                    characterWeapon.innerText = currentWeapon
                    characterWeaponsArea.append(characterWeapon)
                }
            }

            let characterNewWeapon = document.createElement("button")
            characterNewWeapon.innerText = "New Weapon"
            characterWeaponsArea.append(characterNewWeapon)

            let characterDeleteWeapon = document.createElement("button")
            characterDeleteWeapon.innerText = "Delete Weapon"
            characterWeaponsArea.append(characterDeleteWeapon)

            characterNewWeapon.onclick = function () {
                let newWeaponArea = document.getElementById("newWeaponArea")
                newWeaponArea.innerHTML = ""

                let newWeaponForm = document.createElement("form")
                newWeaponArea.append(newWeaponForm)

                let newWeaponNameLabel = document.createElement("label")
                newWeaponNameLabel.setAttribute("for", "newWeaponName")
                newWeaponNameLabel.innerText = "Weapon Name"
                newWeaponForm.append(newWeaponNameLabel)

                let newWeaponNameInput = document.createElement("input")
                newWeaponNameInput.setAttribute("id", "newWeaponName")
                newWeaponNameInput.setAttribute("name", "newWeaponName")
                newWeaponForm.append(newWeaponNameInput)

                let weaponBr = document.createElement("br")
                newWeaponForm.append(weaponBr)

                let newWeaponDamageLabel = document.createElement("label")
                newWeaponDamageLabel.setAttribute("for", "newWeaponDamage")
                newWeaponDamageLabel.innerText = "Weapon Damage"
                newWeaponForm.append(newWeaponDamageLabel)

                let newWeaponDamageInput = document.createElement("input")
                newWeaponDamageInput.setAttribute("id", "newWeaponDamage")
                newWeaponDamageInput.setAttribute("Damage", "newWeaponDamage")
                newWeaponForm.append(newWeaponDamageInput)

                let weaponBr2 = document.createElement("br")
                newWeaponForm.append(weaponBr2)

                let newWeaponSubmit = document.createElement("input")
                newWeaponSubmit.setAttribute("type", "submit")
                newWeaponForm.append(newWeaponSubmit)

                newWeaponSubmit.onclick = function () {
                    event.preventDefault()
                    let newWeaponObject = new Object
                    newWeaponObject.Name = newWeaponNameInput.value
                    newWeaponObject.Damage = newWeaponDamageInput.value

                    if (state.characterData[characterArray].weapons !== undefined) {
                        state.characterData[characterArray].weapons.push(newWeaponObject)
                    } else {
                        state.characterData[characterArray].weapons = [newWeaponObject]
                    }


                    let address = "http://localhost:3000/characters/" + state.loginID
                    fetch(address, {
                        method: "PATCH",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ "weapons": state.characterData[characterArray].weapons })
                    })
                }
            }

            characterDeleteWeapon.onclick = function () {
                let newWeaponArea = document.getElementById("newWeaponArea")
                newWeaponArea.innerHTML = ""

                let deleteWeaponForm = document.createElement("form")
                newWeaponArea.append(deleteWeaponForm)

                let weaponIdLabel = document.createElement("label")
                weaponIdLabel.setAttribute("for", "weaponId")
                weaponIdLabel.innerText = "Weapon Number"
                deleteWeaponForm.append(weaponIdLabel)

                let weaponIdInput = document.createElement("input")
                weaponIdInput.setAttribute("id", "weaponId")
                weaponIdInput.setAttribute("name", "weaponId")
                deleteWeaponForm.append(weaponIdInput)

                let weaponBr = document.createElement("br")
                deleteWeaponForm.append(weaponBr)

                let deleteWeaponSubmit = document.createElement("input")
                deleteWeaponSubmit.setAttribute("type", "submit")
                deleteWeaponSubmit.innerText = "Delete"
                deleteWeaponForm.append(deleteWeaponSubmit)

                deleteWeaponSubmit.onclick = function () {
                    event.preventDefault()
                    let deleteId = weaponIdInput.value - 1
                    let characterArray = state.loginID - 1
                    state.characterData[characterArray].weapons.splice(deleteId, 1)

                    let address = "http://localhost:3000/characters/" + state.loginID
                    fetch(address, {
                        method: "PATCH",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ "weapons": state.characterData[characterArray].weapons })
                    })
                }
            }

            let spellSlotsArray = ["first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth", "ninth", "tenth", "eleventh", "twelfth", "thirteenth", "fourteenth", "fifteenth", "sixteenth", "seventeenth", "eighteenth", "nineteenth", "twentieth"]
            let spellSlotsArrayDisplay = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th", "13th", "14th", "15th", "16th", "17th", "18th", "19th", "20th"]

            let characterSpellSlotArea = document.getElementById("characterSpellSlotArea")
            let characterSpellSlotTitle = document.createElement("h2")
            let characterSpellSlotContent = document.createElement("div")
            characterSpellSlotContent.classList.add("characterSpellSlotContent")
            characterSpellSlotTitle.innerText = "Spell Slots"
            characterSpellSlotArea.append(characterSpellSlotTitle)
            characterSpellSlotArea.append(characterSpellSlotContent)

            if (state.characterData[characterArray].spellSlots != undefined) {
                for (let j = 0; j < 20; j++) {
                    let currentSpellSlot = JSON.stringify(state.characterData[characterArray].spellSlots[j])
                    currentSpellSlot = currentSpellSlot.replaceAll("{", "")
                    currentSpellSlot = currentSpellSlot.replaceAll("}", "")
                    currentSpellSlot = currentSpellSlot.replaceAll('"', "")
                    currentSpellSlot = currentSpellSlot.replaceAll(",", " ")
                    currentSpellSlot = currentSpellSlot.substring(currentSpellSlot.indexOf(":") + 1)
                    let characterSpellSlot = document.createElement("p")
                    characterSpellSlot.innerText = currentSpellSlot
                    characterSpellSlotContent.append(characterSpellSlot)

                }
            }

            let editSpellSlots = document.createElement("button")
            editSpellSlots.innerText = "Edit Spell Slots"
            characterSpellSlotArea.append(editSpellSlots)

            editSpellSlots.onclick = function () {
                characterSpellSlotContent.innerHTML = ""
                let spellSlotsForm = document.createElement("form")
                spellSlotsForm.classList.add("spellSlotsForm")
                characterSpellSlotContent.append(spellSlotsForm)
                for (let j = 0; j < 20; j++) {
                    let spellSlotLabel = document.createElement("label")
                    spellSlotLabel.innerText = spellSlotsArrayDisplay[j]
                    spellSlotsForm.append(spellSlotLabel)

                    let spellSlotInput = document.createElement("input")
                    spellSlotInput.setAttribute("id", spellSlotsArray[j])
                    spellSlotInput.setAttribute("type", "number")

                    if (state.characterData[characterArray].spellSlots != undefined) {
                        let currentSpellEdit = JSON.stringify(state.characterData[characterArray].spellSlots[j])
                        currentSpellEdit = currentSpellEdit.replaceAll("{", "")
                        currentSpellEdit = currentSpellEdit.replaceAll("}", "")
                        currentSpellEdit = currentSpellEdit.replaceAll('"', "")
                        currentSpellEdit = currentSpellEdit.replaceAll(",", " ")
                        currentSpellEdit = currentSpellEdit.substring(currentSpellEdit.indexOf(":") + 1)

                        spellSlotInput.value = currentSpellEdit
                    } else {
                        spellSlotInput.value = 0
                    }
                    spellSlotsForm.append(spellSlotInput)

                }
                let spellSlotSubmit = document.createElement("input")
                spellSlotSubmit.setAttribute("type", "submit")
                spellSlotsForm.append(spellSlotSubmit)

                spellSlotSubmit.onclick = function () {
                    event.preventDefault()
                    let newSpellSlots = []
                    let firstSlot = new Object
                    firstSlot.first = first.value
                    newSpellSlots.push(firstSlot)

                    let secondSlot = new Object
                    secondSlot.second = second.value
                    newSpellSlots.push(secondSlot)

                    let thirdSlot = new Object
                    thirdSlot.third = third.value
                    newSpellSlots.push(thirdSlot)

                    let fourthSlot = new Object
                    fourthSlot.fourth = fourth.value
                    newSpellSlots.push(fourthSlot)

                    let fifthSlot = new Object
                    fifthSlot.fifth = fifth.value
                    newSpellSlots.push(fifthSlot)

                    let sixthSlot = new Object
                    sixthSlot.sixth = sixth.value
                    newSpellSlots.push(sixthSlot)

                    let seventhSlot = new Object
                    seventhSlot.seventh = seventh.value
                    newSpellSlots.push(seventhSlot)

                    let eighthSlot = new Object
                    eighthSlot.eighth = eighth.value
                    newSpellSlots.push(eighthSlot)

                    let ninthSlot = new Object
                    ninthSlot.ninth = ninth.value
                    newSpellSlots.push(ninthSlot)

                    let tenthSlot = new Object
                    tenthSlot.tenth = tenth.value
                    newSpellSlots.push(tenthSlot)

                    let eleventhSlot = new Object
                    eleventhSlot.eleventh = eleventh.value
                    newSpellSlots.push(eleventhSlot)

                    let twelfthSlot = new Object
                    twelfthSlot.twelfth = twelfth.value
                    newSpellSlots.push(twelfthSlot)

                    let thirteenthSlot = new Object
                    thirteenthSlot.thirteenth = thirteenth.value
                    newSpellSlots.push(thirteenthSlot)

                    let fourteenthSlot = new Object
                    fourteenthSlot.fourteenth = fourteenth.value
                    newSpellSlots.push(fourteenthSlot)

                    let fifteenthSlot = new Object
                    fifteenthSlot.fifteenth = fifteenth.value
                    newSpellSlots.push(fifteenthSlot)

                    let sixteenthSlot = new Object
                    sixteenthSlot.sixteenth = sixteenth.value
                    newSpellSlots.push(sixteenthSlot)

                    let seventeenthSlot = new Object
                    seventeenthSlot.seventeenth = seventeenth.value
                    newSpellSlots.push(seventeenthSlot)

                    let eighteenthSlot = new Object
                    eighteenthSlot.eighteenth = eighteenth.value
                    newSpellSlots.push(eighteenthSlot)

                    let nineteenthSlot = new Object
                    nineteenthSlot.nineteenth = nineteenth.value
                    newSpellSlots.push(nineteenthSlot)

                    let twentiethSlot = new Object
                    twentiethSlot.twentieth = twentieth.value
                    newSpellSlots.push(twentiethSlot)

                    let dataToPost = '"spellSlots": newSpellSlots'

                    if (state.characterData[characterArray].spellSlots != undefined) {
                        let address = "http://localhost:3000/characters/" + state.loginID
                        fetch(address, {
                            method: "PATCH",
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ "spellSlots": newSpellSlots })
                        })
                    } else {
                        let address = "http://localhost:3000/characters/" + state.loginID
                        fetch(address, {
                            method: "PATCH",
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ "spellSlots": newSpellSlots })
                        })
                    }
                }
            }
        }

        let logOut = document.createElement("button")
        logOut.innerText = "Log Out"

        let deleteAccount = document.createElement("button")
        deleteAccount.innerText = "Delete Account"

        buttonArea.append(logOut)
        buttonArea.append(deleteAccount)

        logOut.onclick = logUserOut;
        deleteAccount.onclick = deleteUserAccount;

        function logUserOut() {
            let address = "http://localhost:3000/accounts/" + state.loginID
            fetch(address, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "loggedIn": false })
            })
                .then(function () {
                    location.replace("./index.html")
                })
        };

        function deleteUserAccount() {
            let modal = document.getElementById("myModal");
            let span = document.getElementsByClassName("close")[0];
            modal.style.display = "block";
            span.onclick = function () {
                modal.style.display = "none";
            }
            window.onclick = function (event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            }

            let deleteConfirm = document.getElementById("confirmDelete")
            deleteConfirm.onclick = function () {
                let address = "http://localhost:3000/accounts/" + state.loginID
                fetch(address, {
                    method: "DELETE",
                })
                    .then(function () {
                        address = "http://localhost:3000/characters/" + state.loginID
                        fetch(address, {
                            method: "DELETE",
                        })
                    })
                    .then(function () {
                        location.replace("./index.html")
                    })
            }
        }

    } else {
        let titleArea = document.getElementById("myCharacterTitle")
        titleArea.innerHTML = "Please Log In to View Your Profile"
    }
}

function shorteningTest() {
    let factsArray = ["Name", "Race", "Class"]

    for (let i = 0; i < factsArray.length; i++) {
        let factsLabel = document.createElement("label")
        factsLabel.innerText = factsArray[i]
        characterFactsContent.append(factsLabel)

        let variableName = "character" + factsArray[i] + "Input"
        eval(variableName + " = " + "document.createElement('input')")
        characterFactsContent.append(variableName)
    }
}


            function createUserCharacter() {
                let characterCreationArea = document.getElementById("characterCreationArea")

                let characterForm = document.createElement("form")
                characterCreationArea.append(characterForm)

                let characterFacts = document.createElement("div")
                characterFacts.classList.add("characterFacts")
                characterForm.append(characterFacts)

                let characterFactsTitle = document.createElement("div")
                characterFactsTitle.classList.add("characterFactsTitle")
                characterFacts.append(characterFactsTitle)

                let characterFactsContent = document.createElement("div")
                characterFactsContent.classList.add("characterFactsContent")
                characterFacts.append(characterFactsContent)

                let characterFactsLabel = document.createElement("h2")
                characterFactsLabel.innerText = "General Info"
                characterFactsTitle.append(characterFactsLabel)

                let factsArray = ["Name", "Race", "Class"]
                let numbersArray = ["Level", "Hp"]

                for (let i = 0; i < factsArray.length; i++) {
                    let factsLabel = document.createElement("label")
                    factsLabel.innerText = factsArray[i]
                    characterFactsContent.append(factsLabel)

                    let attribute = "character" + factsArray[i] + "Input"
                    variableName = document.createElement('input')
                    variableName.setAttribute("id", attribute)
                    characterFactsContent.append(variableName)
                }

                for (let i = 0; i < numbersArray.length; i++) {
                    let factsLabel = document.createElement("label")
                    factsLabel.innerText = numbersArray[i]
                    characterFactsContent.append(factsLabel)

                    let attribute = "character" + numbersArray[i] + "Input"
                    variableName = document.createElement('input')
                    variableName.setAttribute("id", attribute)
                    variableName.setAttribute("type", "number")
                    characterFactsContent.append(variableName)
                }

                let attributesArray = ["Strength", "Dexterity", "Wisdom", "Constitution", "Intelligence", "Charisma"]


                for (let i = 0; i < attributesArray.length; i++) {
                    let factsLabel = document.createElement("label")
                    factsLabel.innerText = attributesArray[i]
                    characterFactsContent.append(factsLabel)

                    let attribute = "character" + attributesArray[i] + "Input"
                    variableName = document.createElement('input')
                    variableName.setAttribute("id", attribute)
                    variableName.setAttribute("type", "number")
                    characterFactsContent.append(variableName)
                }

                let characterProficiencies = document.createElement("div")
                characterProficiencies.classList.add("characterProficiencies")
                characterForm.append(characterProficiencies)

                let characterProficienciesTitle = document.createElement("div")
                characterProficienciesTitle.classList.add("characterProficienciesTitle")
                characterProficiencies.append(characterProficienciesTitle)

                let characterProficienciesContent = document.createElement("div")
                characterProficienciesContent.classList.add("characterProficienciesContent")
                characterProficiencies.append(characterProficienciesContent)

                let characterProficienciesLabel = document.createElement("h2")
                characterProficienciesLabel.innerText = "Skill Proficiencies"
                characterProficienciesTitle.append(characterProficienciesLabel)

                let proficienciesArray = [
                    "Acrobatics",
                    "AnimalHandling",
                    "Arcana",
                    "Athletics",
                    "Deception",
                    "History",
                    "Insight",
                    "Intimidation",
                    "Investigation",
                    "Medicine",
                    "Nature",
                    "Perception",
                    "Performance",
                    "Persuasion",
                    "Religion",
                    "SleightOfHand",
                    "Stealth",
                    "Survival"
                ]

                for (let i = 0; i < proficienciesArray.length; i++) {
                    let factsLabel = document.createElement("label")
                    factsLabel.innerText = proficienciesArray[i]
                    characterProficienciesContent.append(factsLabel)

                    let attribute = "character" + proficienciesArray[i] + "Input"
                    variableName = document.createElement('input')
                    variableName.setAttribute("id", attribute)
                    variableName.setAttribute("type", "checkbox")
                    characterProficienciesContent.append(variableName)
                }
                let handyLinks = document.createElement("div")
                characterForm.append(handyLinks)

                let raceLink = document.createElement("a")
                raceLink.innerText = "Race Guide"
                raceLink.setAttribute("href", "https://www.wargamer.com/dnd/races")
                raceLink.classList.add("guideLink")
                handyLinks.append(raceLink)

                let classLink = document.createElement("a")
                classLink.innerText = "Class Guide"
                classLink.setAttribute("href", "https://www.wargamer.com/dnd/classes")
                classLink.classList.add("guideLink")
                handyLinks.append(classLink)

                let linkBreak = document.createElement("br")
                handyLinks.append(linkBreak)

                let statsLink = document.createElement("a")
                statsLink.innerText = "Stats Guide"
                statsLink.setAttribute("href", "https://dicecove.com/how-to-roll-for-stats/")
                statsLink.classList.add("guideLink")
                handyLinks.append(statsLink)

                let skillsLink = document.createElement("a")
                skillsLink.innerText = "Skills Guide"
                skillsLink.setAttribute("href", "https://ocd20.fandom.com/wiki/Skills")
                skillsLink.classList.add("guideLink")
                handyLinks.append(skillsLink)

                let characterSubmitButton = document.createElement("input")
                characterSubmitButton.setAttribute("type", "submit")
                characterForm.append(characterSubmitButton)

                characterSubmitButton.onclick = function () {
                    event.preventDefault()
                    let newCharacter = new Object
                    newCharacter.id = state.loginID
                    newCharacter.name = characterNameInput.value
                    newCharacter.race = characterRaceInput.value
                    newCharacter.class = characterClassInput.value
                    let newCharacterLevel = parseInt(characterLevelInput.value)
                    newCharacter.level = newCharacterLevel
                    let newCharacterHp = parseInt(characterHpInput.value)
                    newCharacter.hp = newCharacterHp
                    newCharacter.attributes = new Object
                    let newCharacterStrength = parseInt(characterStrengthInput.value)
                    newCharacter.attributes.strength = newCharacterStrength
                    let newCharacterDexterity = parseInt(characterDexterityInput.value)
                    newCharacter.attributes.dexterity = newCharacterDexterity
                    let newCharacterWisdom = parseInt(characterWisdomInput.value)
                    newCharacter.attributes.wisdom = newCharacterWisdom
                    let newCharacterConstitution = parseInt(characterConstitutionInput.value)
                    newCharacter.attributes.constitution = newCharacterConstitution
                    let newCharacterIntelligence = parseInt(characterIntelligenceInput.value)
                    newCharacter.attributes.intelligence = newCharacterIntelligence
                    let newCharacterCharisma = parseInt(characterCharismaInput.value)
                    newCharacter.attributes.charisma = newCharacterCharisma
                    newCharacter.proficiencies = []

                    if (characterAcrobaticsInput.checked === true) {
                        newCharacter.proficiencies.push("Acrobatics")
                    }
                    if (characterAnimalHandlingInput.checked === true) {
                        newCharacter.proficiencies.push("Animal Handling")
                    }
                    if (characterArcanaInput.checked === true) {
                        newCharacter.proficiencies.push("Arcana")
                    }
                    if (characterAthleticsInput.checked === true) {
                        newCharacter.proficiencies.push("Athletics")
                    }
                    if (characterDeceptionInput.checked === true) {
                        newCharacter.proficiencies.push("Deception")
                    }
                    if (characterHistoryInput.checked === true) {
                        newCharacter.proficiencies.push("History")
                    }
                    if (characterInsightInput.checked === true) {
                        newCharacter.proficiencies.push("Insight")
                    }
                    if (characterIntimidationInput.checked === true) {
                        newCharacter.proficiencies.push("Intimidation")
                    }
                    if (characterInvestigationInput.checked === true) {
                        newCharacter.proficiencies.push("Investigation")
                    }
                    if (characterMedicineInput.checked === true) {
                        newCharacter.proficiencies.push("Medicine")
                    }
                    if (characterNatureInput.checked === true) {
                        newCharacter.proficiencies.push("Nature")
                    }
                    if (characterPerceptionInput.checked === true) {
                        newCharacter.proficiencies.push("Perception")
                    }
                    if (characterPerformanceInput.checked === true) {
                        newCharacter.proficiencies.push("Performance")
                    }
                    if (characterPersuasionInput.checked === true) {
                        newCharacter.proficiencies.push("Persuasion")
                    }
                    if (characterReligionInput.checked === true) {
                        newCharacter.proficiencies.push("Religion")
                    }
                    if (characterSleightOfHandInput.checked === true) {
                        newCharacter.proficiencies.push("Sleight of Hand")
                    }

                    fetch("http://localhost:3000/characters", {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(newCharacter)
                    })
                }
            }

            function readyToGo() {
                testLogin()
                characterCheck()
                //shorteningTest()
            }

            fetchData()*/
