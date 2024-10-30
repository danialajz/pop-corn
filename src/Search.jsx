import React, { useEffect, useRef } from "react";

function Search({ query, setQuery }) {
  const inputEl = useRef(null);
  useEffect(function () {
    inputEl.current.focus();
  }, []);
  // useEffect(
  //   function () {
  //     const el = document.querySelector(".search");
  //     el.focus();
  //   },
  //   [query]
  // );
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}

export default Search;
