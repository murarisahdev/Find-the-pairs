// export default App;
import { useState } from "react";
import { shuffleCards } from "./utils/shuffleCards";
import { uniqueCards } from "./utils/uniqueCards";
import Card from "./components/Cards";

function App() {
  const [cards, setCards] = useState(() =>
    shuffleCards(uniqueCards.concat(uniqueCards))
  );
  const [openCards, setOpenCards] = useState([]);
  const [clearedCards, setClearedCards] = useState({});
  const [moves, setMoves] = useState(0);
  const [shouldDisableAllCards, setShouldDisableAllCards] = useState(false);

  const disable = () => {
    setShouldDisableAllCards(true);
  };

  const checkIsInactive = (card) => {
    return Boolean(clearedCards[card.type]);
  };

  const checkIsFlipped = (index) => {
    return openCards.includes(index);
  };

  const handleCardClick = (index) => {
    if (openCards.length === 1) {
      setOpenCards((prev) => [...prev, index]);
      setMoves((moves) => moves + 1);
      disable();
    } else {
      setOpenCards([index]);
    }
  };
  return (
    <div className="App" style={{display: 'flex', alignItems: 'center', margin: '30px auto', height: '85vh', width: '720px', backgroundColor: '#f1f2f3', padding: '15px 30px'}}>
      <div style={{display: 'flex', flexWrap: 'wrap', gap: '15px', padding: '15px 30px' }}>
        {cards.map((card, index) => {
          return (
            <Card
            key={index}
card={card}
index={index}
isDisabled={shouldDisableAllCards}
isInactive={checkIsInactive(card)}
isFlipped={checkIsFlipped(index)}
onClick={handleCardClick}
            />
          );
        })}
      </div>
      <div style={{minWidth: '200px', height: '275px', margin: '15px 0'}}>
        <div style={{backgroundColor: '#fff', padding: '15px 30px', height: '275px',}}>

        </div>
      </div>
    </div>
  );
}

export default App;
