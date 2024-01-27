import "../styles/DifficultySelection.css";

export default function DifficultySelection({enabled, setDifficulty})
{
    if (!enabled) return <></>

    return (
        <>
            <div className="title-container">
                <button className='play-button about-button'>Help</button>
                <h1 className="title">Memory Cards</h1>
                <button className='play-button about-button'>About</button>
            </div>
            <div className="difficulty-container">
                <button onClick={() => setDifficulty(6)} className="play-button easy-button">Easy</button>
                <button onClick={() => setDifficulty(12)} className="play-button">Medium</button>
                <button onClick={() => setDifficulty(18)} className="play-button hard-button">Hard</button>
            </div>
        </>
    )
}