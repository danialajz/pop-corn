import React from "react";

function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>❌ </span>
      {message}
      <span> ❌</span>
    </p>
  );
}

export default ErrorMessage;
