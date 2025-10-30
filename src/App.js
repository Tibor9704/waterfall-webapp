// Waterfall WebApp - React / PWA prototípus animált paklival, nagyobb kártya és stílusos szöveg
import React, { useState } from 'react';
import './App.css';

const suits = [
  {symbol: '♠', color: 'black'},
  {symbol: '♣', color: 'black'},
  {symbol: '♥', color: 'red'},
  {symbol: '♦', color: 'red'}
];
const ranks = ["2","3","4","5","6","7","8","9","10","J","Q","K","A"];

const createDeck = () => {
  const deck = [];
  for (let suit of suits){
    for (let rank of ranks){
      let rule = '';
      switch(rank){
        case '2': rule = suit.color === 'red' ? 'Igyál ennyit.' : 'Ossz szét ennyi kortyot.'; break;
        case '3': rule = suit.color === 'red' ? 'Igyál ennyit.' : 'Ossz szét ennyi kortyot.'; break;
        case '4': rule = suit.color === 'red' ? 'Igyál ennyit.' : 'Ossz szét ennyi kortyot.'; break;
        case '5': rule = 'Márkanevek: mondj egy márkát, többiek folytatják.'; break;
        case '6': rule = 'Sztori kártya: mondj egy szót, a többiek folytatják.'; break;
        case '7': rule = 'Mozgáskártya: kezdj el ismétlődő cselekvést.'; break;
        case '8': rule = 'Szabálykártya: alkoss bármilyen szabályt.'; break;
        case '9': rule = 'Kérdéskártya: te kérdezel, aki válaszol, iszik.'; break;
        case '10': rule = 'Aki utoljára csap a homlokára, iszik.'; break;
        case 'J': rule = 'Szünet kártya: nem kell innod.'; break;
        case 'Q': rule = 'Bárki poharából ihatsz kettőt.'; break;
        case 'K': rule = 'Mindenki iszik kettőt.'; break;
        case 'A': rule = 'Waterfall! Mindenki egyszerre kezd el inni.'; break;
        default: rule='';
      }
      deck.push({rank, suit: suit.symbol, color: suit.color, rule});
    }
  }
  return deck.sort(() => Math.random() - 0.5);
};

function App() {
  const [deck, setDeck] = useState(createDeck());
  const [currentCard, setCurrentCard] = useState(null);
  const [animating, setAnimating] = useState(false);

  const drawCard = () => {
    if(deck.length === 0){
      alert('A pakli elfogyott! Újratöltés.');
      setDeck(createDeck());
      setCurrentCard(null);
      return;
    }
    const card = deck[0];
    setAnimating(true);
    setTimeout(() => {
      setCurrentCard(card);
      setDeck(deck.slice(1));
      setAnimating(false);
    }, 400);
  };

  const resetDeck = () => {
    setDeck(createDeck());
    setCurrentCard(null);
  };

  return (
    <div className="App">
      <h1>♣️ Waterfall</h1>
      <div className="deck-area">
        <p className="remaining">Maradék lapok: {deck.length}</p>
        {currentCard && (
          <div className={`card-display ${currentCard.color} ${animating ? 'animate' : ''}`}> 
            <div className="card-rank">{currentCard.rank}{currentCard.suit}</div>
            <div className="card-rule">{currentCard.rule}</div>
          </div>
        )}
        <div className="button-section">
          <button className="btn-draw" onClick={drawCard}>Kártya húzása</button>
          <button className="btn-reset" onClick={resetDeck}>Újrakezd</button>
        </div>
      </div>
    </div>
  );
}

export default App;

