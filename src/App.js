import { useEffect, useState, useRef } from "react";
import Card from "./components/Cards/card";
import "./app.scss";
import { Button, Container, Typography, Grid } from "@mui/material";
import { uniqueCardsArray } from "./utils/uniqueCards";
import { shuffleCards } from "./utils/shuffleCards";
import SelectOption from "./components/Common/selectOption";
import DialogBox from "./components/Common/dialogBox";

var initialCardsArray = shuffleCards(
  uniqueCardsArray.slice(0, 10).concat(uniqueCardsArray).slice(0, 10)
);

export default function App() {
  const [cards, setCards] = useState(initialCardsArray);
  const [openCards, setOpenCards] = useState([]);
  const [clearedCards, setClearedCards] = useState({});
  const [shouldDisableAllCards, setShouldDisableAllCards] = useState(false);
  const [moves, setMoves] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [option, setOption] = useState(10);
  const [firstRender, setfirstRender] = useState(true);

  const timeout = useRef(null);

  const disable = () => setShouldDisableAllCards(true);
  const enable = () => setShouldDisableAllCards(false);
  const getScore = () => Object.entries(clearedCards).length;
  const getScoreTotal = () => cards.length / 2;
  const checkIsFlipped = (index) => openCards.includes(index);
  const checkIsInactive = (card) => Boolean(clearedCards[card.type]);

  const checkCompletion = () => {
    if (Object.keys(clearedCards).length === cards.length / 2) {
      setShowModal(true);
    }
  };

  const evaluate = () => {
    const [first, second] = openCards;
    enable();
    if (cards[first].type === cards[second].type) {
      setClearedCards((prev) => ({ ...prev, [cards[first].type]: true }));
      setOpenCards([]);
      return;
    }
    // This is to flip the cards back after 500ms duration
    timeout.current = setTimeout(() => {
      setOpenCards([]);
    }, 500);
  };

  const handleCardClick = (index) => {
    if (openCards.length === 1) {
      setOpenCards((prev) => [...prev, index]);
      setMoves((moves) => moves + 1);
      disable();
    } else {
      clearTimeout(timeout.current);
      setOpenCards([index]);
    }
  };

  function getFilteredArray() {
    const tempArray = uniqueCardsArray.slice(0, option);
    initialCardsArray = shuffleCards([...tempArray, ...tempArray]);
    setCards(initialCardsArray);
    setClearedCards({});
    setOpenCards([]);
    setShowModal(false);
    setMoves(0);
    setShouldDisableAllCards(false);
    return initialCardsArray;
  }

  useEffect(() => {
    let timeout = null;
    if (openCards.length === 2) {
      timeout = setTimeout(evaluate, 300);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [openCards]);

  useEffect(() => {
    checkCompletion();
  }, [clearedCards]);

  useEffect(() => {
    getFilteredArray();
  }, [option]);

  useEffect(() => {
    let timerId = setTimeout(() => {
      setfirstRender(false);
    }, 5000);
    return () => clearInterval(timerId);
  }, []);

  const handleRestart = () => {
    setClearedCards({});
    setOpenCards([]);
    setShowModal(false);
    setMoves(0);
    setShouldDisableAllCards(false);
    // set a shuffled deck of cards
    setCards(getFilteredArray());
    setOption(10);
  };

  return (
    <div className="App">
      <Container maxWidth="lg">
        <Typography variant="h4" align="center">
          Find the pairs
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={8}>
            <div className="leftCards">
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
                    firstRender={firstRender}
                  />
                );
              })}
            </div>
          </Grid>
          <Grid item xs={4}>
            <div className="rightCard">
              <div>
                <div className="scroe">
                  <Typography variant="h6">Score</Typography>
                  <Typography variant="h5">
                    <span>{getScore() ?? "0"}</span> / {getScoreTotal()}
                  </Typography>
                  <span>Tries : {moves}</span>
                </div>
                <div>
                  <Typography variant="h6">Options</Typography>
                  <div className="selectBox">
                    <span>Size</span>
                    <SelectOption
                      setOption={setOption}
                      option={option}
                    ></SelectOption>
                  </div>
                </div>
                <Button
                  onClick={handleRestart}
                  color="primary"
                  variant="contained"
                >
                  Restart
                </Button>
              </div>
              {showModal && (
                <DialogBox
                  open={showModal}
                  moves={moves}
                  getScore={getScore}
                  handleRestart={handleRestart}
                />
              )}
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
