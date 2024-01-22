import { useState } from 'react';

import './styles/App.css';
import "./styles/reset.css";

import Card from './components/Card';
import shuffleArray from './arrayShuffler';
import { v4 as generateId } from 'uuid';

function App() {
  
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

  function markCard(cardId, cardsArray)
  {
    const targetIndex = cardsArray.findIndex((image) => image.id === cardId);
    cardsArray[targetIndex].clicked = true;

    return cardsArray;
  }

  function handleCardClick(cardId)
  {
    let newCardImages = Array.from(cardImages);
    newCardImages = Array.from(markCard(cardId, newCardImages));
    newCardImages = Array.from(shuffleCards(newCardImages));
    setCardImages(newCardImages);
  }

  return (
    <>
      {
        cardImages.map(image => <Card key={image.id} id={image.id} imgSrc={image.imgSrc} imgText={image.imgText} onClick={handleCardClick}/>)
      }
    </>
  )
}

export default App
