import React, { useState } from "react";
import Star from "./Star";
import PropTypes from "prop-types";
StarRainting.propTypes = {
  maxRating: PropTypes.number,
  defaultRating: PropTypes.number,
  color: PropTypes.string,
  size: PropTypes.number,
  messages: PropTypes.array,
  className: PropTypes.string,
  onSetRating: PropTypes.func,
};
function StarRainting({
  maxRating = 10,
  color = "#fcc419",
  size = 48,
  className = "",
  messages = [],
  defaultRating = 0,
  onSetRating,
}) {
  const [raiting, setRaiting] = useState(defaultRating);
  const [tempRaiting, setTempRaiting] = useState(0);
  function handelRaiting(raiting) {
    setRaiting(raiting);
    onSetRating(raiting);
  }

  const containerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  };
  const starContainerstyle = {
    display: "flex",
  };
  const textStyle = {
    lineHeight: "1",
    margin: "0",
    color,
    fontSize: `${size / 1.5}px`,
  };
  return (
    <div style={containerStyle} className={className}>
      <div style={starContainerstyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            full={tempRaiting ? tempRaiting >= i + 1 : raiting >= i + 1}
            onRate={() => handelRaiting(i + 1)}
            onHoverIn={() => setTempRaiting(i + 1)}
            onHoverOut={() => setTempRaiting(0)}
            color={color}
            size={size}
          />
        ))}
      </div>
      <p style={textStyle}>
        {messages.length === maxRating
          ? messages[tempRaiting ? tempRaiting - 1 : raiting - 1]
          : tempRaiting || raiting || ""}
      </p>
    </div>
  );
}

export default StarRainting;
