import { useState } from "react"

import "../../css/styles.css"

const CharacterCreateArea = (props) => {

    const { loginID } = props

    const initialFormState = {
        name: "",
        race: "",
        class: "",
        level: 0,
        hp: 0,
        attributes: {
            strength: 0,
            dexterity: 0,
            wisdom: 0,
            constitution: 0,
            intelligence: 0,
            charisma: 0,
        },
        proficiencies: []
    }

    const [formState, setFormState] = useState(initialFormState)

    const handleChange = (event) => {
        setFormState((previousForm) => ({
            ...previousForm,
            [event.target.id]: event.target.value
        }));
    }

    const handleAttributesChange = (event) => {
        let currentAttributes = {...formState.attributes}

        currentAttributes[event.target.id] = event.target.value
        setFormState((previousForm) => ({
            ...previousForm,
            attributes: currentAttributes
        }));
    }

    const handleProficiencyChange = (event) => {
        let currentProficiencies = [...formState.proficiencies]

        if (currentProficiencies.includes(event.target.id)) {
            const index = currentProficiencies.indexOf(event.target.id)
            if (index > -1) {
                currentProficiencies.splice(index, 1);
            }
        } else {
            currentProficiencies.push(event.target.id)
        }

        setFormState((previousForm) => ({
            ...previousForm,
            proficiencies: currentProficiencies
        }));
    }

    const handleCreateSubmit = () => {
        let newCharacter = { ...formState }
        newCharacter.id = loginID
        newCharacter.weapons = []
        newCharacter.spells = []
        newCharacter.spellSlots = [
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0"
        ]

        console.log(newCharacter)

        fetch("http://localhost:3000/characters", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCharacter)
        })

    }

    return (
        <form onSubmit={() => handleCreateSubmit()}>
            <div className="characterFacts">
                <div className="characterFactsTitle">
                    <h2>General Info</h2>
                </div>
                <div className="characterFactsContent">
                    <label>Name</label>
                    <input type="text" id="name" onChange={(event) => handleChange(event)} value={formState.name}></input>
                    <label>Race</label>
                    <input type="text" id="race" onChange={(event) => handleChange(event)} value={formState.race}></input>
                    <label>Class</label>
                    <input type="text" id="class" onChange={(event) => handleChange(event)} value={formState.class}></input>
                    <label>Level</label>
                    <input type="number" id="level" onChange={(event) => handleChange(event)} value={formState.level}></input>
                    <label>HP</label>
                    <input type="number" id="hp" onChange={(event) => handleChange(event)} value={formState.hp}></input>
                    <label>Strength</label>
                    <input type="number" id="strength" onChange={(event) => handleAttributesChange(event)} value={formState.attributes.strength}></input>
                    <label>Dexterity</label>
                    <input type="number" id="dexterity" onChange={(event) => handleAttributesChange(event)} value={formState.attributes.dexterity}></input>
                    <label>Wisdom</label>
                    <input type="number" id="wisdom" onChange={(event) => handleAttributesChange(event)} value={formState.attributes.wisdom}></input>
                    <label>Constitution</label>
                    <input type="number" id="constitution" onChange={(event) => handleAttributesChange(event)} value={formState.attributes.constitution}></input>
                    <label>Intelligence</label>
                    <input type="number" id="intelligence" onChange={(event) => handleAttributesChange(event)} value={formState.attributes.intelligence}></input>
                    <label>Charisma</label>
                    <input type="number" id="charisma" onChange={(event) => handleAttributesChange(event)} value={formState.attributes.charisma}></input>
                </div>
            </div>
            <div className="characterProficiencies">
                <div className="characterProficienciesTitle">
                    <h2>Skill Proficiencies</h2>
                </div>
                <div className="characterProficienciesContent">
                    <label>Acrobatics</label>
                    <input type="checkbox" id="Acrobatics" onChange={(event) => handleProficiencyChange(event)}></input>
                    <label>Animal Handling</label>
                    <input type="checkbox" id="AnimalHandling" onChange={(event) => handleProficiencyChange(event)}></input>
                    <label>Arcana</label>
                    <input type="checkbox" id="Arcana" onChange={(event) => handleProficiencyChange(event)}></input>
                    <label>Athletics</label>
                    <input type="checkbox" id="Athletics" onChange={(event) => handleProficiencyChange(event)}></input>
                    <label>Deception</label>
                    <input type="checkbox" id="Deception" onChange={(event) => handleProficiencyChange(event)}></input>
                    <label>History</label>
                    <input type="checkbox" id="History" onChange={(event) => handleProficiencyChange(event)}></input>
                    <label>Insight</label>
                    <input type="checkbox" id="Insight" onChange={(event) => handleProficiencyChange(event)}></input>
                    <label>Intimidation</label>
                    <input type="checkbox" id="Intimidation" onChange={(event) => handleProficiencyChange(event)}></input>
                    <label>Investigation</label>
                    <input type="checkbox" id="Investigation" onChange={(event) => handleProficiencyChange(event)}></input>
                    <label>Medicine</label>
                    <input type="checkbox" id="Medicine" onChange={(event) => handleProficiencyChange(event)}></input>
                    <label>Nature</label>
                    <input type="checkbox" id="Nature" onChange={(event) => handleProficiencyChange(event)}></input>
                    <label>Perception</label>
                    <input type="checkbox" id="Perception" onChange={(event) => handleProficiencyChange(event)}></input>
                    <label>Performance</label>
                    <input type="checkbox" id="Performance" onChange={(event) => handleProficiencyChange(event)}></input>
                    <label>Persuasion</label>
                    <input type="checkbox" id="Persuasion" onChange={(event) => handleProficiencyChange(event)}></input>
                    <label>Religion</label>
                    <input type="checkbox" id="Religion" onChange={(event) => handleProficiencyChange(event)}></input>
                    <label>Sleight of Hand</label>
                    <input type="checkbox" id="SleightOfHand" onChange={(event) => handleProficiencyChange(event)}></input>
                    <label>Stealth</label>
                    <input type="checkbox" id="Stealth" onChange={(event) => handleProficiencyChange(event)}></input>
                    <label>Survival</label>
                    <input type="checkbox" id="Survival" onChange={(event) => handleProficiencyChange(event)}></input>
                </div>
            </div>
            <input type="submit"></input>
        </form>
    )

}

export default CharacterCreateArea