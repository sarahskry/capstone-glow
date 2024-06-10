import "./MovieSearchResults.scss";
import SearchResultCard from "../SearchResultCard/SearchResultCard";



const MovieSearchResults = ({ results }) => {
    return (
      <ul className="moviesearch-list">
        {results.length > 0 ? (
          results.map((movieSearchResult, index) => (
            <li className="moviesearch-list__item" key={index}>
                <SearchResultCard 
                    poster_path={movieSearchResult.poster_path}
                    title={movieSearchResult.title}
                    overview={movieSearchResult.overview}
                    release_date={movieSearchResult.release_date}
                    movie_id={movieSearchResult.id} //retrieve movie id from api to be able to add to watched list
                />
            </li>
          ))
        ) : (
          <p>No Movies found</p>
        )}
      </ul>
    );
  };
  
  export default MovieSearchResults;