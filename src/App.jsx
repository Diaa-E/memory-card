import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';

import './styles/App.css';
import "./styles/reset.css";

import Card from './components/Card';
import shuffleArray from './arrayShuffler';

function App() {
  
  const [cardImages, setCardImages] = useState(() => {

    const array = []
    for (let i = 0; i < 12; i++)
    {
      array.push({imgSrc:"", imgText: `${i}`, clicked: false});
    }

    return array;
  });

  function shuffleCards()
  {
    setCardImages(Array.from(shuffleArray(cardImages)));
  }

  return (
    <>
      {
        cardImages.map(image => <Card key={image.imgText} imgSrc={image.imgSrc} imgText={image.imgText} onClick={shuffleCards}/>)
      }
    </>
  )
}

export default App
