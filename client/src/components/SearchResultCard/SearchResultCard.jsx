import "./SearchResultCard.scss";


function SearchResultCard({ poster_path, title, overview, release_date }) {
  const posterBaseUrl = `${import.meta.env.VITE_IMAGE_BASE_URL}`;
  
  return (

      <div className="searchresult-card">
        <img className="searchresult-card__poster" src={`${posterBaseUrl}${poster_path}`} alt={title} />
        <div className="searchresult-card-details">
          <h4 className="searchresult-card-details__title">{title}</h4>
          <h4 className="searchresult-card-details__release-date">Release Date: {release_date}</h4>
          <p className="searchresult-card-details__overview">{overview}</p>
        </div>
      </div>

  );
}

export default SearchResultCard;
