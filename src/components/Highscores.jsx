import "../styles/Highscores.css";

export default function Highscores({highscores})
{
    return (
        <div className="highscores-container">
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