import shuffleArray from "../arrayShuffler";
import "../styles/Game.css";
import Card from "./Card";
import { useState, useEffect } from "react";

export default function Game({enabled, cards, appStatus, appStatusMap, updateCards, onWin, onGameover})
{
    const [time, setTime] = useState(0);
    const [score, setScore] = useState(0);
    const [clickedCards, setClickedCards] = useState(0);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    function getCardIndex(cardId, cardsArray)
    {
      return cardsArray.findIndex((image) => image.id === cardId);
    }

    function handleCardClick(cardId)
    {
        if (appStatus !== appStatusMap.normal) return;

        const cardIndex = getCardIndex(cardId, cards);
        
        if (cards[cardIndex].clicked)
        {
            onGameover(score, time);
            return;
        }
        
        let newCardImages = [...cards];
        newCardImages[cardIndex].clicked = true;
        newCardImages = [...shuffleArray(newCardImages)];
        setScore(score => score + 1);
        updateCards(newCardImages);
        setClickedCards(clickedCards => clickedCards + 1);

        if (clickedCards + 1 === cards.length)
        {
            onWin(score, time);
        }
    }

    useEffect(() => {

        if (!enabled) return;
    
        setScore(0);
        setTime(0);
        setClickedCards(0);
        const timer = setInterval(() => setTime(time => time + 1), 1000);
    
        return () => {
    
          clearInterval(timer);
        };
    
      }, [enabled]);

    if (!enabled) return <></>

    return (
        <div className="game-container">
            <h2 className="time">{minutes < 10? "0" + minutes : minutes}:{seconds < 10? "0" + seconds : seconds}</h2>
            <h2 className="score">{score}</h2>
            {
                cards.map(image => <Card
                                        key={image.id}
                                        id={image.id}
                                        imgSrc={image.imgSrc}
                                        imgText={image.imgText}
                                        onClick={handleCardClick}
                                    />)
            }
        </div>
    )
}