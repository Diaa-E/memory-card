import "../styles/GameoverScreen.css";
import Highscores from "./Highscores";

export default function GameoverScreen({enabled, appStatus, appStatusMap, highscores, currentScore, resetGame})
{
    if (!enabled) return <></>

    return (
        <div className="gameover-container">
            <div className="play-again-container">
                <button onClick={() => resetGame(false)} className="play-button">Play Again</button>
                <button onClick={() => resetGame(true)} className="play-button set-diff-button">Change Difficulty</button>
            </div>
            <h2 className="gameover-title">{appStatus === appStatusMap.win? "You Win!" : "Game Over!"}</h2>
            <Highscores highscores={highscores} currentScore={currentScore} />
        </div>
    )
}