import { useState, useEffect } from 'react';

import './styles/App.css';
import "./styles/reset.css";

import Card from './components/Card';
import shuffleArray from './arrayShuffler';
import { v4 as generateId } from 'uuid';
import getRandomCards from './cardFetcher';

function App() {

  const [loading, setLoading] = useState(true);
  const [highscores, setHighscores] = useState([]);
  const [time, setTime] = useState(0);
  const [gameover, setgameover] = useState(false);
  const [score, setScore] = useState(0);
  const [cardImages, setCardImages] = useState(() => {

    const array = [];
    for (let i = 0; i < 12; i++)
    {
      array.push({id:generateId(), imgSrc:"", imgText: `${i}`, clicked: false});
    }

    return array;
  });

  useEffect(() => {

    if (!loading) return;

    getRandomCards(12).then((cards => {

      const images = []
      
      cards.forEach(card => {
        
        images.push({id:card.code, imgSrc:card.image, imgText: ``, clicked: false});
      })
      
      setCardImages(images);
      setLoading(false);
    }));

  }, [loading]);

  useEffect(() => {

    if (gameover) return;

    const timer = setInterval(() => setTime(time => time + 1), 1000);

    return () => {

      clearInterval(timer);
    };

  }, [gameover]);

  function saveHighscore()
  {
    const newScore = {
      score: score,
      time: time,
      rank: +score / +time,
      id: generateId(),
    };

    const newHighscores = [...highscores, newScore].sort((a, b) => {

      if (a.rank > b.rank) return -1;
      return 1;
    });

    while (newHighscores.length > 5)
    {
      newHighscores.pop();
    }

    setHighscores(newHighscores);
  }

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
      saveHighscore();
      return;
    }
    
    setScore(score + 1);
    let newCardImages = [...cardImages];
    newCardImages[cardIndex].clicked = true;
    newCardImages = [...shuffleCards(newCardImages)];
    setCardImages(newCardImages);
  }

  function resetGame()
  {
    const freshCards = [...cardImages];

    freshCards.forEach(card => {

      card.clicked = false;
    });

    setCardImages(freshCards);
    setgameover(false);
    setTime(0);
    setScore(0);
  }

  return (
    <>
      <ul>
        {
          highscores.map(highscore => <li key={highscore.id}><p>Time: {highscore.time} Score: {highscore.score}</p></li>)
        }
      </ul>
      <h2>Time: {time}</h2>
      {
        gameover? 
          <>
            <h2>Game Over</h2>
            <button onClick={resetGame}>Play Again</button>
          </>
        : <></>
      }
      <h1>Score: {score}</h1>
      {
        cardImages.map(image => <Card key={image.id} id={image.id} imgSrc={image.imgSrc} imgText={image.imgText} onClick={handleCardClick}/>)
      }
    </>
  )
}

export default App
