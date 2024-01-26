import "../styles/Highscores.css";

export default function Highscores({highscores, currentScore})
{
    return (
        <div className="highscores-container">
            <div className="highscores-row  current-score-highlight">
                <p>{currentScore.score}</p>
                <p>{currentScore.time}</p>
            </div>
            <h3>Best</h3>
            {
                highscores.map(score => {
                    return (
                        <div key={score.id} className="highscores-row">
                            <p>{score.score}</p>
                            <p>{score.time}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}