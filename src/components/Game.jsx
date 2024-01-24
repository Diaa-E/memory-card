import "../styles/Game.css";
import Card from "./Card";
import { useState, useEffect } from "react";

export default function Game({enabled, cards, winner, gameover, onCardClick})
{
    const [time, setTime] = useState(0);
    const [score, setScore] = useState(0);

    useEffect(() => {

        if (gameover) return;
    
        const timer = setInterval(() => setTime(time => time + 1), 1000);
    
        return () => {
    
          clearInterval(timer);
        };
    
      }, [gameover]);

    if (!enabled) return <></>

    return (
        <div className="game-container">
            <h2 className="time">{time}</h2>
            <h2 className="score">{score}</h2>
            {
                cards.map(image => <Card key={image.id} id={image.id} imgSrc={image.imgSrc} imgText={image.imgText} onClick={onCardClick}/>)
            }
        </div>
    )
}