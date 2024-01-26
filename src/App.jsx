import { useState, useEffect } from 'react';

import './styles/App.css';
import "./styles/reset.css";

import { v4 as generateId } from 'uuid';
import getRandomCards from './cardFetcher';
import LoadingScreen from './components/LoadingScreen';
import Game from './components/Game';
import GameoverScreen from './components/GameoverScreen';
import ReadyScreen from './components/ReadyScreen';

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
  const [highscores, setHighscores] = useState([]);
  const [cards, setCards] = useState([]);
  const [currentScore, setCurrentScore] = useState({});

  useEffect(() => {

    if (appStatus !== appStatusMap.loading) return;

    getRandomCards(cardCount).then((cards => {

      const images = []
      
      cards.forEach(card => {
        
        images.push({id:card.id, imgSrc:card.image, imgText: `card`, clicked: false});
        setCards(images);
        setAppStatus(appStatusMap.ready)
      });
      
    }));

  }, [appStatus]);

  function saveHighscore(score, time, timePretty)
  {
    const newScore = {
      score: score,
      time: timePretty,
      rank: +score / +time,
      id: generateId(),
    };

    setCurrentScore(newScore);
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

  function handleGameover(score, time, timePretty)
  {
    setAppStatus(appStatusMap.gameover)
    saveHighscore(score, time, timePretty);
  }

  function handleWin(score, time, timePretty)
  {
    setAppStatus(appStatusMap.win);
    saveHighscore(score, time, timePretty);
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
  }

  function startGame()
  {
    setAppStatus(appStatusMap.normal);
  }

  return (
    <div className='main-container' style={{backgroundColor: bgColors[appStatus]}}>

      <LoadingScreen enabled={appStatus === appStatusMap.loading}/>

      <ReadyScreen enabled={appStatus === appStatusMap.ready} onClick={startGame}/>

      <GameoverScreen
        enabled={appStatus === appStatusMap.gameover || appStatus === appStatusMap.win}
        appStatus={appStatus}
        appStatusMap={appStatusMap}
        highscores={highscores}
        resetGame={resetGame}
        currentScore={currentScore}
      />

      <Game
        enabled={appStatus === appStatusMap.normal}
        cards={cards}
        appStatus={appStatus}
        appStatusMap={appStatusMap}
        onWin={handleWin}
        onGameover={handleGameover}
        updateCards={updateCards}
      />
    </div>
  )
}

export default App
