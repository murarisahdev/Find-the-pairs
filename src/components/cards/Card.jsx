//React
import React from "react";
//classnames
import classnames from "classnames";
//components
import "./Card.scss";
//material ui
import { Box } from "@mui/material";
//assets
import QuestionMark from "../../assets/svgs/QuestionMark";

const Card = ({
  onClick,
  card,
  index,
  isInactive,
  isFlipped,
  isDisabled,
  firstRender
}) => {

  const handleClick = () => !isFlipped && !isDisabled && onClick(index);

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
        <QuestionMark/>
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
