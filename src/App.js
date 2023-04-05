import { useEffect, useState, useRef } from "react";
import { Container, Typography, Grid, Box } from "@mui/material";
import { uniqueCardsArray } from "./utils/UniqueCards";
import { shuffleCards } from "./utils/ShuffleCards";
import Leftpanel from "./components/leftPanel/Leftpanel";
import RightPanel from "./components/rightPanel/RightPanel";

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

  // To set all pairs found
  const checkCompletion = () => {
    if (Object.keys(clearedCards).length === cards.length / 2) {
      setShowModal(true);
    }
  };

  // Matches for the same card
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

  // Handle the click on card
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

  // Rearrange and increase the array length according to option pair
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

  // useEffect(() => {
  //   getFilteredArray();
  // }, [option]);

  useEffect(() => {
    // Open the card for first time
    setfirstRender(true);
    getFilteredArray();
    let timerId = setTimeout(() => {
      setfirstRender(false);
    }, 5000);
    return () => clearInterval(timerId);
  }, [option]);

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
    <Box
      className="App"
      sx={{ backgroundColor: "#f1f2f3", padding: "56px 0px" }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          align="center"
          sx={{ fontSize: "40px", fontWeight: 700, paddingBottom: "57px" }}
        >
          Find the pairs
        </Typography>
        <Grid container spacing={3}>
          <RightPanel
            cards={cards}
            shouldDisableAllCards={shouldDisableAllCards}
            handleCardClick={handleCardClick}
            firstRender={firstRender}
            openCards={openCards}
            clearedCards={clearedCards}
          />
          <Leftpanel
            moves={moves}
            getScore={getScore}
            getScoreTotal={getScoreTotal}
            option={option}
            setOption={setOption}
            showModal={showModal}
            handleRestart={handleRestart}
          />
        </Grid>
      </Container>
    </Box>
  );
}
