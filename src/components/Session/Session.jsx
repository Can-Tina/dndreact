import { useState } from "react";

import "../../css/styles.css"

const Session = (props) => {

    const { loginID, indexCaller, characterData } = props

    const initialHealth = characterData[indexCaller].hp

    const [myValue, setMyValue] = useState("")
    const [myHValue, setMyHValue] = useState("")
    const [myAValue, setMyAValue] = useState("")
    const [currentHealth, setCurrentHealth] = useState(initialHealth)

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
        const myRoll = doRoll(dice[`${myDice}`]);
        setMyValue(myRoll)
    }

    function attackRoll(myDice) {
        const myRoll = doRoll(dice["D20"]);
        if (myRoll === 20) {
            setMyHValue("Critical Hit")
        } else if (myRoll === 1) {
            setMyHValue("Critical Miss")
        } else {
            setMyHValue(myRoll)
        }

        if (myDice === "twoSix") {
            let sixOne = doRoll(dice[`D6`])
            let sixTwo = doRoll(dice[`D6`])
            let combined = sixOne + sixTwo
            setMyAValue(combined)
        } else {
            const myAttack = doRoll(dice[`${myDice}`]);
            setMyAValue(myAttack)
        }
    }

    const handleHealthChange = (mod) => {
        let newHealth = 0
        if (mod === "add1") {
            newHealth = currentHealth + 1
        } else if (mod === "add10") {
            newHealth = currentHealth + 10
        } else if (mod === "minus10") {
            newHealth = currentHealth - 10
        } else if (mod === "minus1") {
            newHealth = currentHealth - 1
        }

        setCurrentHealth(newHealth)

        let address = "http://localhost:3000/characters/" + loginID
        fetch(address, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "hp": newHealth })
        })
    }

    return (
        <main className="sessionPage">
            <div className="title">
                <h1>Session Time</h1>
            </div>
            <div className="health">
                <h2 className="yourHealth">Your Health:</h2>
                <div className="healthFunction">
                    {loginID > 0 && (
                        <>
                            <button value="plusOne" id="plusOne" onClick={() => handleHealthChange("add1")}>+1</button>
                            <button value="plusTen" id="plusTen" onClick={() => handleHealthChange("add10")}>+10</button>
                            <div className="healthValue">{currentHealth}</div>
                            <button value="minusTen" id="minusTen" onClick={() => handleHealthChange("minus10")}>-10</button>
                            <button value="minusOne" id="minusOne" onClick={() => handleHealthChange("minus1")}>-1</button>
                        </>
                    )}
                    {loginID === 0 && (
                        <p>Please log in to access health features</p>
                    )}
                </div>
            </div>
            <div className="dice">
                <div id="rollDice">
                    <h2 className="easterEgg">Roll a dice</h2>
                    <div id="diceRoll">
                        <div className="diceRoller">
                            <label htmlFor="D20">Roll D20</label>
                            <input type="button" id="D20" value="Roll" onClick={() => rollDice("D20")}></input>
                        </div>
                        <div className="diceRoller">
                            <label htmlFor="D12">Roll D12</label>
                            <input type="button" id="D12" value="Roll" onClick={() => rollDice("D12")}></input>
                        </div>
                        <div className="diceRoller">
                            <label htmlFor="D10">Roll D10</label>
                            <input type="button" id="D10" value="Roll" onClick={() => rollDice("D10")}></input>
                        </div>
                        <div className="diceRoller">
                            <label htmlFor="D8">Roll D8</label>
                            <input type="button" id="D8" value="Roll" onClick={() => rollDice("D8")}></input>
                        </div>
                        <div className="diceRoller">
                            <label htmlFor="D6">Roll D6</label>
                            <input type="button" id="D6" value="Roll" onClick={() => rollDice("D6")}></input>
                        </div>
                        <div className="diceRoller">
                            <label htmlFor="D4">Roll D4</label>
                            <input type="button" id="D4" value="Roll" onClick={() => rollDice("D4")}></input>
                        </div>
                        <div>
                            <div className="rollOutcome">
                                <p>Your Roll:</p>
                                <p id="diceRollOutcome">{myValue}</p>
                            </div>

                        </div>
                    </div>
                </div>
                <h2>Make an attack</h2>
                <div id="attack">
                    <div className="attackRoller diceRoller" >
                        <label htmlFor="D4">Roll 1D4</label>
                        <input type="button" id="D4" value="Roll" onClick={() => attackRoll("D4")}></input>
                    </div>
                    <div className="attackRoller diceRoller" >
                        <label htmlFor="D6">Roll 1D6</label>
                        <input type="button" id="D6" value="Roll" onClick={() => attackRoll("D6")}></input>
                    </div>
                    <div className="attackRoller diceRoller" >
                        <label htmlFor="D8">Roll 1D8</label>
                        <input type="button" id="D8" value="Roll" onClick={() => attackRoll("D8")}></input>
                    </div>
                    <div className="attackRoller diceRoller" >
                        <label htmlFor="D10">Roll 1D10</label>
                        <input type="button" id="D10" value="Roll" onClick={() => attackRoll("D10")}></input>
                    </div>
                    <div className="attackRoller diceRoller" >
                        <label htmlFor="D12">Roll 1D12</label>
                        <input type="button" id="D12" value="Roll" onClick={() => attackRoll("D12")}></input>
                    </div>
                    <div className="attackRoller diceRoller" >
                        <label htmlFor="twoSix">Roll 2D6</label>
                        <input type="button" id="twoSix" value="Roll" onClick={() => attackRoll("twoSix")}></input>
                    </div>
                    <div className="proficiencyCheck"></div>
                </div>
                <div>
                    <div className="hitOutcome">
                        <p>Your Hit Roll:</p>
                        <p id="hitRollOutcome">{myHValue}</p>
                    </div>
                    <div className="attackOutcome">
                        <p>Your Attack Roll:</p>
                        <p id="attackRollOutcome">{myAValue}</p>
                    </div>
                </div>
                <div>
                    <div id="spellSlots">
                        <h2>Your Spell Slots</h2>
                        <div >
                            {loginID > 0 && (
                                <ul id="characterSpellSlotArea">
                                    {characterData[indexCaller].spellSlots.map((slot, index) => {
                                        return (
                                            <li key={index}>{slot}</li>
                                        )
                                    })}
                                </ul>
                            )}
                            {loginID === 0 && (
                                <p>Please log in to access spell slot features</p>
                            )}
                        </div>
                    </div>
                    <div id="guides">
                        <h2>Here's some gameplay guides</h2>
                        <a href="https://www.polygon.com/deals/21294556/dnd-how-to-play-dungeons-dragons-5e-guide-spells-dice-character-sheets-dm">Polygon htmlFor Beginners</a>
                        <br></br>
                        <a href="https://www.dicebreaker.com/games/dungeons-and-dragons-5e/how-to/how-to-play-dungeons-and-dragons">Dicebreaker htmlFor Beginners</a>
                        <br></br>
                        <a href="https://www.dndbeyond.com/sources/basic-rules/combat">Dndbeyond on Combat</a>
                        <br></br>
                        <a href="https://roleplayersrespite.com/dnd-5e-combat-basics">Roleplayers Respite on Combat</a>
                    </div>
                </div>
            </div>
            <div className="InhtmlFormation">
                <h2>Your Weapons:</h2>
                <div id="weaponsArea">
                    {loginID > 0 && (
                        <ul>
                            {characterData[indexCaller].weapons.map((weapon, index) => {
                                return (
                                    <li key={index}>{weapon.Name}: {weapon.Damage}</li>
                                )
                            })}
                        </ul>
                    )}
                    {loginID === 0 && (
                        <p>Please log in to access weapons</p>
                    )}

                </div>
                <h2>Your Spells:</h2>
                <div id="weaponsArea">
                    {loginID > 0 && (
                        <ul>
                            {characterData[indexCaller].spells.map((spell, index) => {
                                return (
                                    <li key={index}>{spell.Name}: {spell.Effect}</li>
                                )
                            })}
                        </ul>
                    )}
                    {loginID === 0 && (
                        <p>Please log in to access weapons</p>
                    )}

                </div>
                <h2>Your Proficiencies:</h2>
                <div id="proficiencyArea">
                    {loginID > 0 && (
                        <ul>
                            {characterData[indexCaller].proficiencies.map((proficiency, index) => {
                                return (
                                    <li key={index}>{proficiency}</li>
                                )
                            })}
                        </ul>
                    )}
                    {loginID === 0 && (
                        <p>Please log in to access proficiencies</p>
                    )}

                </div>
            </div>
        </main>
    )

}

export default Session;