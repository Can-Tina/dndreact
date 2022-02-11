import { useEffect, useState } from "react/cjs/react.development"

import "../../css/styles.css"

const CharacterDisplayArea = (props) => {

    const { characterData, characterArray, loginID } = props

    const [newWeaponForm, setNewWeaponForm] = useState(false)
    const [deleteWeaponForm, setDeleteWeaponForm] = useState(false)
    const [newSpellForm, setNewSpellForm] = useState(false)
    const [deleteSpellForm, setDeleteSpellForm] = useState(false)
    const [spellSlotForm, setSpellSlotForm] = useState(false)

    const handleNewWeapon = () => {
        if (newWeaponForm === false) {
            setNewWeaponForm(true)
        } else {
            setNewWeaponForm(false)
        }
    }

    const handleNewWeaponSubmit = (e) => {
        let newWeaponObject = {}
        newWeaponObject.Name = e.target.newWeaponName.value
        newWeaponObject.Damage = e.target.newWeaponDamage.value

        let newWeaponsList = [...characterData[characterArray].weapons, newWeaponObject]

        let address = "http://localhost:3000/characters/" + loginID
        fetch(address, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "weapons": newWeaponsList })
        })
    }

    const handleDeleteWeapon = () => {
        if (deleteWeaponForm === false) {
            setDeleteWeaponForm(true)
        } else {
            setDeleteWeaponForm(false)
        }
    }

    const handleDeleteWeaponSubmit = (e) => {
        let deleteId = e.target.weaponId.value - 1
        let deleteWeaponsArray = characterData[characterArray].weapons
        deleteWeaponsArray.splice(deleteId, 1)

        let address = "http://localhost:3000/characters/" + loginID
        fetch(address, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "weapons": deleteWeaponsArray })
        })
    }

    const handleNewSpell = () => {
        if (newSpellForm === false) {
            setNewSpellForm(true)
        } else {
            setNewSpellForm(false)
        }
    }

    const handleNewSpellSubmit = (e) => {
        let newSpellObject = {}
        newSpellObject.Name = e.target.newSpellName.value
        newSpellObject.Effect = e.target.newSpellEffect.value

        let newSpellsList = [...characterData[characterArray].spells, newSpellObject]

        console.log(loginID)

        let address = "http://localhost:3000/characters/" + loginID
        fetch(address, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "spells": newSpellsList })
        })
    }

    const handleDeleteSpell = () => {
        if (deleteSpellForm === false) {
            setDeleteSpellForm(true)
        } else {
            setDeleteSpellForm(false)
        }
    }

    const handleDeleteSpellSubmit = (e) => {
        let deleteId = e.target.spellId.value - 1
        let deleteSpellArray = [...characterData[characterArray].spells]
        deleteSpellArray.splice(deleteId, 1)
        console.log(deleteSpellArray)

        let address = "http://localhost:3000/characters/" + loginID
        fetch(address, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "spells": deleteSpellArray })
        })
    }


    const handleEditSpellSlots = () => {
        if (spellSlotForm === false) {
            setSpellSlotForm(true)
        } else {
            setSpellSlotForm(false)
        }
    }

    const handleEditSpellSlotsSubmit = (e) => {
        let newSlotArray = []
        for (let i = 0; i < 20; i++) {
            newSlotArray.push(e.target[i].value)
        }

        let address = "http://localhost:3000/characters/" + loginID
        fetch(address, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "spellSlots": newSlotArray })
        })
    }

    return (
        <>
            <h2>{characterData[characterArray].name}</h2>
            <div className="characterContent">
                <ul className="characterInfo">
                    <li>Race: {characterData[characterArray].race}</li>
                    <li>Class: {characterData[characterArray].class}</li>
                    <li>Level: {characterData[characterArray].level}</li>
                    <li>HP: {characterData[characterArray].hp}</li>
                </ul>
                <ul className="characterAttributes">
                    <li>Strength: {characterData[characterArray].attributes.strength}</li>
                    <li>Dexterity: {characterData[characterArray].attributes.dexterity}</li>
                    <li>Wisdom: {characterData[characterArray].attributes.wisdom}</li>
                    <li>Constitution: {characterData[characterArray].attributes.constitution}</li>
                    <li>Intelligence: {characterData[characterArray].attributes.intelligence}</li>
                    <li>Charisma: {characterData[characterArray].attributes.charisma}</li>
                </ul>
                <ul className="characterProficienciesDisplay">
                    <li className="characterProficienciesTitle">Proficiencies: </li>
                    <br></br>
                    {characterData[characterArray].proficiencies.map((proficiency, index) => {
                        return (
                            <li key={index}>{proficiency}</li>
                        )
                    })}
                </ul>
                <div>
                    <h2>Weapons</h2>
                    <ul>
                        {characterData[characterArray].weapons.map((weapon, index) => {
                            return (
                                <li key={index}>{weapon.Name}: {weapon.Damage}</li>
                            )
                        })}
                    </ul>
                    <br></br>
                    {newWeaponForm === false && (
                        <button onClick={handleNewWeapon}>New Weapon</button>
                    )}
                    <button onClick={handleDeleteWeapon}>Delete Weapon</button>
                    {newWeaponForm === true && (
                        <>
                            <h3>New Weapon</h3>
                            <form onSubmit={(event) => handleNewWeaponSubmit(event)}>
                                <label htmlFor="newWeaponName">Weapon Name</label>
                                <input id="newWeaponName" type="text"></input>
                                <br></br>
                                <label htmlFor="newWeaponDamage">Weapon Damage</label>
                                <input id="newWeaponDamage" type="text"></input>
                                <input id="newWeaponSubmit" type="submit"></input>
                                <button onClick={() => handleNewWeapon}>Cancel</button>
                            </form>
                        </>

                    )}

                    {deleteWeaponForm === true && (
                        <>
                            <h3>Delete Weapon</h3>
                            <form onSubmit={(event) => handleDeleteWeaponSubmit(event)}>
                                <label htmlFor="weaponId">Weapon Number</label>
                                <input type="number" id="weaponId"></input>
                                <input type="submit"></input>
                            </form>
                        </>
                    )}
                </div>
                <div>
                    <h2>Spells</h2>
                    <ul>
                        {characterData[characterArray].spells.map((spell, index) => {
                            return (
                                <li key={index}>{spell.Name}: {spell.Effect}</li>
                            )
                        })}
                    </ul>
                    <br></br>
                    {newSpellForm === false && (
                        <button onClick={handleNewSpell}>New Spell</button>
                    )}
                    <button onClick={handleDeleteSpell}>Delete Spell</button>
                    {newSpellForm === true && (
                        <>
                            <h3>New Spell</h3>
                            <form onSubmit={(event) => handleNewSpellSubmit(event)}>
                                <label htmlFor="newSpellName">Spell Name</label>
                                <input id="newSpellName" type="text"></input>
                                <br></br>
                                <label htmlFor="newSpellEffect">Spell Effect</label>
                                <input id="newSpellEffect" type="text"></input>
                                <input id="newSpellSubmit" type="submit"></input>
                                <button onClick={() => handleNewSpell}>Cancel</button>
                            </form>
                        </>

                    )}

                    {deleteSpellForm === true && (
                        <>
                            <h3>Delete Spell</h3>
                            <form onSubmit={(event) => handleDeleteSpellSubmit(event)}>
                                <label htmlFor="spellId">Spell Number</label>
                                <input type="number" id="spellId"></input>
                                <input type="submit"></input>
                            </form>
                        </>
                    )}
                </div>
            </div>
            <div >
                <h2 className="spellSlotHeader">Spell Slots</h2>
                <ul className="characterSpellSlotContent">
                    {characterData[characterArray].spellSlots.map((slot, index) => {
                        return (
                            <li key={index}>{slot}</li>
                        )
                    })}
                </ul>
                {spellSlotForm === false && (
                    <button onClick={() => handleEditSpellSlots()}>Edit Spell Slots</button>
                )}
                {spellSlotForm === true && (
                    <>
                        <h3>Edit Spell Slots</h3>
                        <form onSubmit={(event) => handleEditSpellSlotsSubmit(event)} className="spellSlotsForm">
                            {characterData[characterArray].spellSlots.map((slot, index) => {
                                return (
                                    <>
                                        <label className="spellSlotLabel">{index + 1}</label>
                                        <input id={index} type="number" key={index}></input>
                                        <br></br>
                                    </>
                                )
                            })}
                            <button onClick={() => handleEditSpellSlots()}>Cancel</button>
                            <input type="submit"></input>
                        </form>
                    </>
                )}
            </div>
        </>
    )

}

export default CharacterDisplayArea