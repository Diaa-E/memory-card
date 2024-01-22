import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Card from './components/Card'

function App() {
  
  const [cardImages, setCardImages] = useState(() => {

    const array = []
    for (let i = 0; i < 12; i++)
    {
      array.push({imgSrc:"", imgText: `${i}`, clicked: false});
    }

    return array;
  });

  return (
    <>
      {
        cardImages.map(image => <Card key={image.imgText} imgSrc={image.imgSrc} imgText={image.imgText}/>)
      }
    </>
  )
}

export default App
