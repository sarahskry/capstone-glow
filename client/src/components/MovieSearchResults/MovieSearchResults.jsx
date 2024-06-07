import React from "react";

const MovieSearchResults = ({ results }) => {
  return (
    <div>
      {results.length > 0 ? (
        results.map((movieSearchResult, index) => (
          <div key={index}>
            <p>{movieSearchResult.title}</p>
            <p>{movieSearchResult.overview}</p>
            <p>{movieSearchResult.release_date}</p>
          </div>
        ))
      ) : (
        <p>No Movies found</p>
      )}
    </div>
  );
};

export default MovieSearchResults;