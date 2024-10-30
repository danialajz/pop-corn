import React, { useEffect, useRef } from "react";
import UseKey from "../hooks/UseKey";

function Search({ query, setQuery }) {
  const inputEl = useRef(null);
  UseKey("Enter", function () {
    if (document.addEventListener === inputEl.current) return;
    inputEl.current.focus();
    setQuery("");
  });
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
