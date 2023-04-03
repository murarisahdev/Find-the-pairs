import frontImage from "../assets/images/FrontImage.jpeg";
import classnames from "classnames";

const Card = ({ onClick, index, isInactive, isFlipped, isDisabled }) => {
  const handleClick = () => {
    !isFlipped && !isDisabled && onClick(index);
  };

  return (
    <div
      className={classnames("card", {
        "is-flipped": isFlipped,
        "is-inactive": isInactive,
      })}
    >
      <div className="card-face card-font-face">
        <img src={frontImage} alt="frontImage" />
      </div>
    </div>
  );
};

export default Card;
