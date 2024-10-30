import React, { useEffect } from "react";

function Search({ query, setQuery }) {
  useEffect(
    function () {
      const el = document.querySelector(".search");
      el.focus();
    },
    [query]
  );
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

export default Search;
