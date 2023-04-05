import React from "react";
import { Grid, Box } from "@mui/material";
import Card from "../cards/Card";

const RightPanel = ({
  cards,
  shouldDisableAllCards,
  handleCardClick,
  firstRender,
  openCards,
  clearedCards,
}) => {
  
  const cardLength = cards?.length;
  const colItem = cardLength === 30 ? 6 : cardLength === 42 ? 6 : cardLength === 36 ? 6 : 4;
  const rowItem = cardLength === 30 ? 5 : cardLength === 42 ? 7 : cardLength === 36 ? 6 : 5;

  const checkIsFlipped = (index) => openCards.includes(index);
  const checkIsInactive = (card) => Boolean(clearedCards[card.type]);

  return (
    <>
      <Grid item xs={8}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: `repeat(${colItem}, 1fr)`,
            gridTemplateRows: `repeat(${rowItem}, 1fr)`,
            gap: "1rem",
          }}
        >
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
        </Box>
      </Grid>
    </>
  );
};

export default RightPanel;
