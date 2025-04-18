import React from "react";

const StarRating = ({ value, max, onChange }) => {
  return (
    <div>
      {Array.from({ length: max }, (_, i) => {
        const filled = i < value;
        return (
          <span
            key={i}
            onClick={() => onChange(i + 1)}
            style={{
              cursor: "pointer",
              color: filled ? "gold" : "gray",
              fontSize: "40px",
              marginRight: "4px"
            }}
          >
            ★
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;
