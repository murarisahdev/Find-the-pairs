import React from 'react';
import frontImage from '../assets/images/FrontImage.jpeg'
import classnames from "classnames";

const Card = ({ onClick, index, isInactive, isFlipped, isDisabled }) => {
    const handleClick = () => {
        !isFlipped && !isDisabled && onClick(index);
    };
    return (
        <div className={classnames("card", {
            "is-flipped": isFlipped,
            "is-inactive": isInactive,
        })} >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', width: "80px", height: '80px', backgroundColor: '#0095f5', borderRadius: '5px' }} className="card-face card-font-face">
                {/* <img src={frontImage} alt="frontImage" style={{ width: "100%", height: '100%' }} /> */}
                <p>?</p>
            </div>
        </div>
    );
};

export default Card;