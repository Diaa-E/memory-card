import "../styles/Tabs.css";

export default function HelpTab({enabled})
{
    if (!enabled) return <></>

    return (
        <div className="tab">
            <p>You receive a <span className="span-highlight">number of cards
            </span> based on the <span className="span-highlight">difficulty</span> you choose.</p>
            <p>Each time a card is <span className="span-highlight">clicked</span>, all the cards get <span className="span-highlight">shuffled</span> around.</p>
            <p>Each card click adds <span className="span-highlight">one point</span> to the score.</p>
            <p>You <span className="span-danger">lose</span> the game by clicking a card <span className="span-danger">twice</span>.</p>
            <p>You <span className="span-valid">win</span> the game by clicking all cards <span className="span-valid">once</span>.</p>
        </div>
    )
}