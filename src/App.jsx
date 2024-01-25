import { useState, useEffect } from 'react';

import './styles/App.css';
import "./styles/reset.css";

import { v4 as generateId } from 'uuid';
import getRandomCards from './cardFetcher';
import LoadingScreen from './components/LoadingScreen';
import Game from './components/Game';

function App() {

  const cardCount = 12;

  const [winner, setWinner] = useState(false);
  const [loading, setLoading] = useState(true);
  const [highscores, setHighscores] = useState([]);
  const [gameover, setgameover] = useState(false);
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

  function saveHighscore(score, time)
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

  function handleGameover(score, time)
  {
    setgameover(true);
    saveHighscore(score, time);
  }

  function handleWin(score, time)
  {
    setgameover(true);
    setWinner(true);
    saveHighscore(score, time);
  }

  function updateCards(newCards)
  {
    setCards(newCards);
  }

  function resetGame()
  {
    const freshCards = [...cards];

    freshCards.forEach(card => {

      card.clicked = false;
    });

    setCards(freshCards);
    setgameover(false);
    setClickedCards(0);
    setWinner(false);
  }

  return (
    <div className='main-container' style={{backgroundColor: `var(${loading? "--bg-loading" : "--bg-normal"})`}}>
      <LoadingScreen enabled={loading}/>
      <Game
        enabled={!loading && !gameover}
        cards={cards}
        gameover={gameover}
        winner={winner}
        onWin={handleWin}
        onGameover={handleGameover}
        updateCards={updateCards}
      />
    </div>
  )
}

export default App
