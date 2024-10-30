import React, { useEffect, useState } from "react";
import Navbar from "./Ui/Navbar";
import MainBar from "./Ui/MainBar";
import Search from "./Movie/Search";
import Logo from "./Ui/Logo";
import Numresault from "./Ui/Numresault";
import List from "./Movie/List";
import Box from "./Ui/Box";
import Summery from "./Ui/Summery";
import MovieList from "./Movie/MovieList";
import Loader from "./Ui/Loader";
import ErrorMessage from "./Ui/ErrorMessage";
import SelectedMovie from "./Movie/SelectedMovie";
import UseMovie from "./hooks/UseMovie";
import UseLocalStorageState from "./hooks/UseLocalStorageState";
import UseKey from "./hooks/UseKey";

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
  // const [watched, setWatched] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const { movies, isLoading, error } = UseMovie(query);
  const [watched, setWatched] = UseLocalStorageState([], "watched");

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

  UseKey("Escape", handelCloseMovie );

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
