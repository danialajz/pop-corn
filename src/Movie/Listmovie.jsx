import React, { useState } from "react";
import Movie from "../Ui/Movie";

function Listmovie({ movies, handelSelectMovie }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie
          movie={movie}
          key={movie.imdbID}
          handelSelectMovie={handelSelectMovie}
        />
      ))}
    </ul>
  );
}

export default Listmovie;
