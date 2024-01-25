import "../styles/GameoverScreen.css";

export default function GameoverScreen({enabled, appStatus, appStatusMap, highscores})
{
    if (!enabled) return <></>

    return (
        <div className="gameover-container">
            <h2 className="gameover-title">{appStatus === appStatusMap.win? "You Win!" : "Game Over!"}</h2>
            <div className="highscores-container"></div>
        </div>
    )
}