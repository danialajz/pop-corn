/*eslint-disable*/
import React, { useEffect, useRef, useState } from "react";
import StarRainting from "./StarRainting";
import Loader from "./Loader";

function SelectedMovie({
  selectedId,
  handelCloseMovie,
  handelAddWathced,
  watched,
}) {
  const key = "9f18a9ed";
  const [movie, setMovies] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRaiting, setUserRaiting] = useState("");
  const countRef = useRef(0);
  useEffect(
    function () {
      if (userRaiting) countRef.current = countRef.current++;
    },
    [userRaiting]
  );

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRaiting;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;
  if (imdbRating > 9) [isTop, setTop] = useState(true);
  const [avgRaiting, setAvgRaiting] = useState(0);
  function handelAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRaiting,
      countRaitingDecisions: countRef.current,
    };
    handelAddWathced(newWatchedMovie);
    // handelCloseMovie();
    setAvgRaiting(Number(imdbRating));
    setAvgRaiting((avgRaiting) => (avgRaiting + userRaiting) / 2);
  }

  useEffect(
    function () {
      async function getMovieDetails() {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${key}&i=${selectedId}`
        );
        const data = await res.json();
        setMovies(data);
        setIsLoading(false);
      }
      getMovieDetails();
    },
    [selectedId]
  );

  useEffect(
    function () {
      function callback(e) {
        if (e.code === "Escape") {
          handelCloseMovie();
        }
      }
      document.addEventListener("keydown", callback);
      return function () {
        document.addEventListener("keydown", callback);
      };
    },
    [handelCloseMovie]
  );
  //   if (!movie) return <div>Loading...</div>;
  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;
      return function () {
        document.title = "PopCorn";
      };
    },
    [title]
  );

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={handelCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} imdb Rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRainting
                    maxRaiting={10}
                    size={24}
                    onSetRating={setUserRaiting}
                  />
                  {userRaiting > 0 && (
                    <button className="btn-add" onClick={handelAdd}>
                      +Add To List
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You rated with movie {watchedUserRating} <span>⭐️</span>
                </p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Direct by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}

export default SelectedMovie;
