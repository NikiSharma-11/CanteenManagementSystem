import React from 'react';

const DisplayStar = ({ star }) => {
  const renderStar = (index) => {
    return (
      <span key={index}>
        {index + 1 <= star ? (
          <i className="fa fa-star" style={{ color: 'gold', fontSize: '20px' }}></i>
        ) : (
          <i className="fa fa-star-o" style={{ color: 'gray', fontSize: '20px' }}></i>
        )}
      </span>
    );
  };

  return (
    <div className="star-icons">
      {Array.from({ length: 5 }, (_, index) => renderStar(index))}
    </div>
  );
};

export default DisplayStar;