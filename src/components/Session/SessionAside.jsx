import { useState } from "react";

import "../../css/styles.css"

const SessionAside = (props) => {

    return (
        <aside className="sidebar">
            <div className="rollDiceNav">
                <a href="#rollDice">Roll a dice</a>
            </div>
            <div className="attackNav">
                <a href="#attack">Make an attack</a>
            </div>
            <div className="spellSlotNav">
                <a href="#spellSlots">Spell Slots</a>
            </div>
        </aside>
    )
}

export default SessionAside;