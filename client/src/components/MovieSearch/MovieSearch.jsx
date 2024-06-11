import "./MovieSearch.scss";
import { useState, useCallback } from "react";
import debounce from 'lodash.debounce';

export function MovieSearch({ onSearch }) {
  const [query, setQuery] = useState("");

  const debouncedSearch = useCallback(
    debounce((searchQuery) => {
        onSearch(searchQuery);
    }, 500),
    [onSearch]
  );

  const handleInputChange = (event) => {
    const { value } = event.target;
    setQuery(value);
    debouncedSearch(value);
  };
  
  return (
    <form className="moviesearch" onSubmit={(e) => e.preventDefault()}>
      <input
        type="text"
        placeholder="Search for a movie..."
        name="search"
        className="moviesearch__field"
        value={query}
        onChange={handleInputChange}
      />
    </form>
  );
}
