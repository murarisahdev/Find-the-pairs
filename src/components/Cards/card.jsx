import React from "react";
import classnames from "classnames";
import questionMarkIcon from "../../assets/icons/questionMarkIcon.svg";
import "./card.scss";

const Card = ({
  onClick,
  card,
  index,
  isInactive,
  isFlipped,
  isDisabled,
  firstRender,
}) => {
  const handleClick = () => !isFlipped && !isDisabled && onClick(index);

  return (
    <div
      className={classnames("card", {
        "is-flipped": isFlipped || firstRender,
        "is-inactive": isInactive,
      })}
      onClick={handleClick}
    >
      <div className="card-face card-font-face">
        <img src={questionMarkIcon} alt="questionMarkIcon" />
      </div>
      <div className="card-face card-back-face">
        <img src={card.image} alt="card" />
      </div>
    </div>
  );
};

export default Card;
