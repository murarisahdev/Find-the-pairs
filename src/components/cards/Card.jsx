import React, { useEffect } from "react";
import classnames from "classnames";
import questionMarkIcon from "../../assets/icons/questionMarkIcon.svg";
import "./Card.scss";
import { Box } from "@mui/material";

const Card = ({
  onClick,
  card,
  index,
  isInactive,
  isFlipped,
  isDisabled,
  firstRender,
  openCards,
  evaluate,
  checkCompletion,
  clearedCards,
}) => {
  const handleClick = () => !isFlipped && !isDisabled && onClick(index);

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

  return (
    <Box
      className={classnames("card", {
        "is-flipped": isFlipped || firstRender,
        "is-inactive": isInactive,
      })}
      sx={{
        height: "145px",
        width: "100%",
        borderRadius: "4px",
        boxShadow: "2px 2px 4px 4px #DEDEDE",
        transition: "0.3s",
        transformStyle: "preserve-3d",
        position: "relative",
        cursor: "pointer",
      }}
      onClick={handleClick}
    >
      <Box
        sx={{
          backgroundColor: "#1890FF",
          backfaceVisibility: "hidden",
          position: "absolute",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "4px",
        }}
      >
        <img src={questionMarkIcon} alt="questionMarkIcon" />
      </Box>
      <Box
        className="card-face card-back-face"
        sx={{
          transform: "rotateY(180deg)",
          backgroundColor: "#1890FF",
          backfaceVisibility: "hidden",
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
      >
        <img
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          src={card.image}
          alt="card"
        />
      </Box>
    </Box>
  );
};

export default Card;
