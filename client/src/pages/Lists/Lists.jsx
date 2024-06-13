import "./Lists.scss";
import Header from "../../components/Header/Header";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Lists({ token }) {
  const [lists, setLists] = useState([]);
  const [movies, setMovies] = useState([]);
  const [selectedListId, setSelectedListId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      fetchLists();
    }
  }, [token]);

  async function fetchLists() {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_LOCALHOST}watched/lists`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLists(response.data);
    } catch (err) {
      console.error("Error fetching lists", err);
    }
  }

  async function fetchMovies(listId) {
    setLoading(true);
    setSelectedListId(listId);
    setMovies([]);

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_LOCALHOST}watched/lists/${listId}/movies`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const movieDetails = [];
      for (const movie of response.data) {
        const movieId = movie.movie_id;
        try {
          const movieResponse = await axios.get(
            `https://api.themoviedb.org/3/movie/${movieId}`,
            {
              params: {
                api_key: import.meta.env.VITE_API_KEY,
              },
            }
          );
          movieDetails.push(movieResponse.data);
        } catch (error) {
          console.error("Error fetching movie details:", error);
          movieDetails.push({ movie_id: movieId, error: true });
        }
      }

      setMovies(movieDetails);
    } catch (err) {
      console.error("Error fetching movies", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Header />
      <section className="lists-container">
        <h2 className="lists-container__title">Your Movie Lists</h2>
        <div>You have {lists.length} lists.</div>
        {lists.map((list) => (
          <div
            key={list.id}
            onClick={() => fetchMovies(list.id)}
            className={selectedListId === list.id ? 'active-list' : ''}
          >
            {list.list_title}
          </div>
        ))}

        {selectedListId && (
          <div>
            <h2>Movies in Selected List</h2>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div className="movie-lists">
                {movies.length === 0 ? (
                  <p>No movies found</p>
                ) : (
                  movies.map((movie) => (
                    <div key={movie.id} className="movie-card">
                      {movie.error ? (
                        <p>Error loading movie details for ID {movie.movie_id}</p>
                      ) : (
                        <>
                          <img
                            src={`${import.meta.env.VITE_IMAGE_BASE_URL}${movie.poster_path}`}
                            alt={movie.title}
                            className="movie-card__poster"
                          />
                          <div className="movie-card__details">
                            <h3>{movie.title}</h3>
                            <p>{movie.release_date}</p>
                            <p>{movie.overview}</p>
                          </div>
                        </>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}