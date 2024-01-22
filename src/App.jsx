import { useState } from 'react';

import './styles/App.css';
import "./styles/reset.css";

import Card from './components/Card';
import shuffleArray from './arrayShuffler';
import { v4 as generateId } from 'uuid';

function App() {
  
  const [gameover, setgameover] = useState(false);
  const [score, setScore] = useState(0);
  const [cardImages, setCardImages] = useState(() => {

    const array = []
    for (let i = 0; i < 12; i++)
    {
      array.push({id:generateId(), imgSrc:"", imgText: `${i}`, clicked: false});
    }

    return array;
  });

  function shuffleCards()
  {
    return shuffleArray(cardImages);
  }

  function getCardIndex(cardId, cardsArray)
  {
    return cardsArray.findIndex((image) => image.id === cardId);
  }

  function handleCardClick(cardId)
  {
    if (gameover) return;

    const cardIndex = getCardIndex(cardId, cardImages);
    
    if (cardImages[cardIndex].clicked)
    {
      setgameover(true);
      return;
    }
    
    setScore(score + 1);
    let newCardImages = [...cardImages];
    newCardImages[cardIndex].clicked = true
    newCardImages = [...shuffleCards(newCardImages)];
    setCardImages(newCardImages);
  }

  return (
    <>
      {
        gameover? <h2>Game Over</h2> : <></>
      }
      <h1>Score: {score}</h1>
      {
        cardImages.map(image => <Card key={image.id} id={image.id} imgSrc={image.imgSrc} imgText={image.imgText} onClick={handleCardClick}/>)
      }
    </>
  )
}

export default App
