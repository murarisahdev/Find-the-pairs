import { useState } from "react";
import { shuffleCards } from "./utils/shuffleCards";
import { uniqueCards } from "./utils/uniqueCards";
import Card from "./components/card";

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
    <div className="App">
      {cards.map((card, index) => {
        return (
          <C
            ard
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
  );
}

export default App;
