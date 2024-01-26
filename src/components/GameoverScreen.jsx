import "../styles/GameoverScreen.css";
import Highscores from "./Highscores";

export default function GameoverScreen({enabled, appStatus, appStatusMap, highscores, currentScore, resetGame})
{
    if (!enabled) return <></>

    return (
        <div className="gameover-container">
            <button onClick={resetGame} className="play-button">Play Again</button>
            <h2 className="gameover-title">{appStatus === appStatusMap.win? "You Win!" : "Game Over!"}</h2>
            <Highscores highscores={highscores} currentScore={currentScore} />
        </div>
    )
}