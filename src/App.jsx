import { useState, useEffect } from 'react';

import './styles/App.css';
import "./styles/reset.css";

import Card from './components/Card';
import shuffleArray from './arrayShuffler';
import { v4 as generateId } from 'uuid';
import getRandomCards from './cardFetcher';
import LoadingScreen from './components/LoadingScreen';
import Game from './components/Game';

function App() {

  const cardCount = 12;

  const [clickedCards, setClickedCards] = useState(0);
  const [winner, setWinner] = useState(false);
  const [loading, setLoading] = useState(true);
  const [highscores, setHighscores] = useState([]);
  const [time, setTime] = useState(0);
  const [gameover, setgameover] = useState(false);
  const [score, setScore] = useState(0);
  const [cards, setCards] = useState([])

  useEffect(() => {

    if (!loading) return;

    getRandomCards(cardCount).then((cards => {

      const images = []
      
      cards.forEach(card => {
        
        images.push({id:card.id, imgSrc:card.image, imgText: `card`, clicked: false});
        setCards(images);
        setLoading(false);
      });
      
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
    return shuffleArray(cards);
  }

  function getCardIndex(cardId, cardsArray)
  {
    return cardsArray.findIndex((image) => image.id === cardId);
  }

  function handleCardClick(cardId)
  {
    if (gameover) return;

    const cardIndex = getCardIndex(cardId, cards);
    
    if (cards[cardIndex].clicked)
    {
      setgameover(true);
      saveHighscore();
      return;
    }
    
    let newCardImages = [...cards];
    newCardImages[cardIndex].clicked = true;
    newCardImages = [...shuffleCards(newCardImages)];
    setScore(score => score + 1);
    setCards(newCardImages);
    setClickedCards(clickedCards => clickedCards + 1);

    if (clickedCards + 1 === cardCount)
    {
      setgameover(true);
      setWinner(true);
      saveHighscore();
    }
  }

  function resetGame()
  {
    const freshCards = [...cards];

    freshCards.forEach(card => {

      card.clicked = false;
    });

    setCards(freshCards);
    setgameover(false);
    setTime(0);
    setScore(0);
    setClickedCards(0);
    setWinner(false);
  }

  return (
    <div className='main-container' style={{backgroundColor: `var(${loading? "--bg-loading" : "--bg-normal"})`}}>
      <LoadingScreen enabled={loading}/>
      <Game enabled={!loading && !gameover} cards={cards} gameover={gameover} onCardClick={handleCardClick} winner={winner}/>
      {/* <ul>
        {
          highscores.map(highscore => <li key={highscore.id}><p>Time: {highscore.time} Score: {highscore.score}</p></li>)
        }
      </ul>
      <h2>Time: {time}</h2>
      {
        gameover? 
          <>
            <h2>{winner? "You Win" : "Game Over"}</h2>
            <button onClick={resetGame}>Play Again</button>
          </>
        : <></>
      }
      <h1>Score: {score}</h1>
      {
        cards.map(image => <Card key={image.id} id={image.id} imgSrc={image.imgSrc} imgText={image.imgText} onClick={handleCardClick}/>)
      } */}
    </div>
  )
}

export default App
