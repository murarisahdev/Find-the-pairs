import React from "react";
import { Grid, Box } from "@mui/material";
import Card from "../cards/Card";

const RightPanel = ({
  cards,
  shouldDisableAllCards,
  checkIsFlipped,
  checkIsInactive,
  handleCardClick,
  firstRender,
  openCards,
  evaluate,
  checkCompletion,
  clearedCards,
}) => {
  return (
    <>
      <Grid item xs={8}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gridTemplateRows: "repeat(5, 1fr)",
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
                openCards={openCards}
                evaluate={evaluate}
                checkCompletion={checkCompletion}
                clearedCards={clearedCards}
              />
            );
          })}
        </Box>
      </Grid>
    </>
  );
};

export default RightPanel;
