import React from 'react';

const Star = ({ stars, onStarClick }) => {
  const renderStar = (index) => {
    let number = index +1;
    return (
      <span key={index} onClick={() => onStarClick(number)} style={{ cursor: 'pointer' }}>
        {stars >= number ? (
          <i className="fa-solid fa-star" style={{fontSize:'50px'}}></i>
        ) : stars > index ? (
          <i className="fa-solid fa-star-half-stroke"style={{fontSize:'50px'}}></i>
        ) : (
          <i className="fa-regular fa-star"style={{fontSize:'30px'}}></i>
        )}
      </span>
    );
  };

  return <div className="star-icons">{Array.from({ length: 5 }, (_, index) => renderStar(index))}</div>;
};

export default Star;