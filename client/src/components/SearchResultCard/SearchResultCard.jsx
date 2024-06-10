import CrudButton from "../CrudButton/CrudButton";
import "./SearchResultCard.scss";
import axios from "axios";

function SearchResultCard({ poster_path, title, overview, release_date }) {
  const posterBaseUrl = `${import.meta.env.VITE_IMAGE_BASE_URL}`;

  //POST request to add movie from search to Watched List
  const handleAddClick = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_LOCALHOST}watched`,
        { movieId: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response.data);
    } catch (err) {
      console.error("Error adding movie to Watched List", err);
    }
  };

  return (
    <div className="searchresult-card">
      <img
        className="searchresult-card__poster"
        src={`${posterBaseUrl}${poster_path}`}
        alt={title}
      />
      <div className="searchresult-card-details">
        <h4 className="searchresult-card-details__title">{title}</h4>
        <h4 className="searchresult-card-details__release-date">
          Release Date: {release_date}
        </h4>
        <p className="searchresult-card-details__overview">{overview}</p>
        <CrudButton onClick={handleAddClick}>+ Add to Watched List</CrudButton>
      </div>
    </div>
  );
}

export default SearchResultCard;
