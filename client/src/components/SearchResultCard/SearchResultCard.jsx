import "./SearchResultCard.scss";


function SearchResultCard({ poster_path, title, overview, release_date }) {
  const posterBaseUrl = `${import.meta.env.VITE_IMAGE_BASE_URL}`;
  
  return (

      <div className="searchresult-card">
        <img className="searchresult-card__poster" src={`${posterBaseUrl}${poster_path}`} alt={title} />
        <div className="searchresult-card-details">
          <h4 className="searchresult-card-details__title">{title}</h4>
          <p className="searchresult-card-details__overview">{overview}</p>
          <h4 className="searchresult-card-details__release-date">{release_date}</h4>
        </div>
      </div>

  );
}

export default SearchResultCard;
