import { useState, useEffect } from 'react';

import './styles/App.css';
import "./styles/reset.css";

import { v4 as generateId } from 'uuid';
import getRandomCards from './cardFetcher';
import LoadingScreen from './components/LoadingScreen';
import Game from './components/Game';
import GameoverScreen from './components/GameoverScreen';

function App() {

  const cardCount = 12;
  const appStatusMap = {
    loading: "loading",
    ready: "ready",
    normal: "normal",
    gameover: "gameover",
    win: "win",
  };

  const bgColors = {
    loading: "var(--bg-loading)",
    ready: "var(--bg-valid)",
    normal: "var(--bg-normal)",
    gameover: "var(--bg-danger)",
    win: "var(--bg-valid)"
  }

  const [appStatus, setAppStatus] = useState(appStatusMap.loading);
  const [winner, setWinner] = useState(false);
  const [highscores, setHighscores] = useState([]);
  const [cards, setCards] = useState([])

  useEffect(() => {

    if (appStatus !== appStatusMap.loading) return;

    getRandomCards(cardCount).then((cards => {

      const images = []
      
      cards.forEach(card => {
        
        images.push({id:card.id, imgSrc:card.image, imgText: `card`, clicked: false});
        setCards(images);
        setAppStatus(appStatusMap.normal)
      });
      
    }));

  }, [appStatus]);

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
    setAppStatus(appStatusMap.gameover)
    saveHighscore(score, time);
  }

  function handleWin(score, time)
  {
    setAppStatus(appStatusMap.win);
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
    setAppStatus(appStatusMap.loading);
    setClickedCards(0);
    setWinner(false);
  }

  return (
    <div className='main-container' style={{backgroundColor: bgColors[appStatus]}}>
      <LoadingScreen enabled={appStatus === appStatusMap.loading}/>
      <GameoverScreen
        enabled={appStatus === appStatusMap.gameover || appStatus === appStatusMap.win}
        appStatus={appStatus}
        appStatusMap={appStatusMap}
      />
      <Game
        enabled={appStatus === appStatusMap.normal}
        cards={cards}
        appStatus={appStatus}
        appStatusMap={appStatusMap}
        winner={winner}
        onWin={handleWin}
        onGameover={handleGameover}
        updateCards={updateCards}
      />
    </div>
  )
}

export default App
