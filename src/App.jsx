import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import MainBar from "./MainBar";
import Search from "./Search";
import Logo from "./Logo";
import Numresault from "./Numresault";
import List from "./List";
import Box from "./Box";
import Summery from "./Summery";
import MovieList from "./MovieList";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import SelectedMovie from "./SelectedMovie";

// const tempMovieData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt0133093",
//     Title: "The Matrix",
//     Year: "1999",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt6751668",
//     Title: "Parasite",
//     Year: "2019",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
//   },
// ];

// const tempWatchedData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//     runtime: 148,
//     imdbRating: 8.8,
//     userRating: 10,
//   },
//   {
//     imdbID: "tt0088763",
//     Title: "Back to the Future",
//     Year: "1985",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
//     runtime: 116,
//     imdbRating: 8.5,
//     userRating: 9,
//   },
// ];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, SetError] = useState();
  const [selectedId, setSelectedId] = useState(null);
  const key = "9f18a9ed";
  // const tempQuery = "interstellari";
  function handelSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }
  function handelCloseMovie() {
    setSelectedId(null);
  }

  function handelAddWathced(movie) {
    setWatched((watched) => [...watched, movie]);
  }
  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  useEffect(function () {
    document.addEventListener("keydown", function (e) {
      if (e.code === "Escape") {
        handelCloseMovie();
      }
    });
  });
  const contoroller = new AbortController();
  useEffect(
    function () {
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
      handelCloseMovie();
      fetchMovies();
      return function () {
        contoroller.abort();
      };
    },
    [query]
  );

  return (
    <>
      <Navbar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        {/* movies={movies}  */}
        <Numresault movies={movies} />
      </Navbar>
      <MainBar>
        <Box>
          {/* {isLoading ? <Loader /> : <List movies={movies} />} */}
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <List movies={movies} handelSelectMovie={handelSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <SelectedMovie
              selectedId={selectedId}
              handelCloseMovie={handelCloseMovie}
              handelAddWathced={handelAddWathced}
              watched={watched}
            />
          ) : (
            <>
              <Summery watched={watched} average={average} />
              <MovieList
                watched={watched}
                handleDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>

        {/* <List movies={movies} />
        <Box average={average} watched={watched} movies={movies} /> */}
      </MainBar>
    </>
  );
}

export default App;
