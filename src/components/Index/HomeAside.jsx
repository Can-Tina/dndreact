import { useState } from "react";

import "../../css/styles.css"

const HomeAside = (props) => {

    return (
        <aside className="sidebar">
        <div className="history">
            <a href="#historySection">History</a>
        </div>
        <div className="example">
            <a href="#exampleSection">Example</a>
        </div>
        <div className="thisSite">
            <a href="#thisSiteSection">This Website</a>
        </div>
    </aside>
    )

}

export default HomeAside;