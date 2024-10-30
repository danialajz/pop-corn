import React, { useEffect, useState } from "react";
const key = "9f18a9ed";

function UseMovie(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, SetError] = useState();
  useEffect(
    function () {
      //   callback?.();
      const contoroller = new AbortController();
      async function fetchMovies() {
        try {
          setIsLoading(true);
          SetError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${key}&s=${query}`,
            { signal: contoroller.signal }
          );
          if (!res.ok) throw new Error("somthing went worng");
          const data = await res.json();
          if (data.Response === "False") throw new error("Movie Not Found");
          setMovies(data.Search);
          SetError("");
          console.log(data.Search);
        } catch (err) {
          console.log(err.message);
          SetError(err.message);
          if ((err.name = "AbortError")) {
            SetError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length < 3) {
        setMovies([]);
        SetError("");
        return;
      }
      //   handelCloseMovie();
      fetchMovies();
      return function () {
        contoroller.abort();
      };
    },
    [query]
  );
  return { movies, isLoading, error };
}

export default UseMovie;
