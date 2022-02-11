import "../../css/styles.css"

const Home = () => {

    return (
        <main class="homePage">
            <h1>Main Homepage</h1>
            <div id="historySection">
                <h2>DnD and its History</h2>
                <p>Dungeons and Dragons is a tabletop roleplaying game (TTRPG) usually set in fantasy worlds. It is decades old and is currently on it's 5th Edition, commonly known as 5e. While there are some official modules created for it, DnD is often used often as just a rule set with homebrew (homemade) worlds, races, classes and other things being prevalent in the community.</p>
            </div>
            <div id="exampleSection">
                <h2>Example Video</h2>
                <p className="crExplanation">This is a video from Critical Role, one of the most famous online Dungeons and Dragons series. Not all DnD gameplay will be like this as every party is different but this is a fun way to see one example!</p>
                <iframe width="909" height="511" src="https://www.youtube.com/embed/i-p9lWIhcLQ" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
            <div id="thisSiteSection">
                <h2>About This Website</h2>
                <p>This website is for people who play Dungeons and Dragons to help keep track of their character during sessions. It comes with many functions such as spell slot trackers, attack rolls and other general roles.</p>
            </div>
        </main>
    )

}

export default Home;