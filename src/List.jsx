import React, { useState } from "react";
import Listmovie from "./Listmovie";

function List({ movies, handelSelectMovie }) {
  const [isOpen1, setIsOpen1] = useState(true);
  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen1((open) => !open)}
      >
        {isOpen1 ? "–" : "+"}
      </button>
      {isOpen1 && (
        <Listmovie movies={movies} handelSelectMovie={handelSelectMovie} />
      )}
    </div>
  );
}

export default List;
