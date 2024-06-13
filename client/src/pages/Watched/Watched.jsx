import "./Watched.scss";
import Header from "../../components/Header/Header";
import { useState, useEffect } from "react";
import axios from "axios";

export default function WatchedPage({ token }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (token) {
      fetchWatchedMovies();
    }
  }, [token]);

  async function fetchWatchedMovies() {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_LOCALHOST}watched`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const movieDetails = [];

      for (const movie of response.data) {
        const movieId = movie.movie_id;

        //get movie details like title for each movie id
        const movieResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}`,
          {
            params: {
              api_key: import.meta.env.VITE_API_KEY,
            },
          }
        );

        // push the movie details to the array
        movieDetails.push(movieResponse.data);
      }
      // setting movie titles
      setMovies(movieDetails);
    } catch (err) {
      console.error("Error fetching watched movies", err);
    }
  }

  return (
    <>
      <Header />

      <section className="movie-list">
        <h3>All the movies you've watched</h3>
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img
              className="movie-card__poster"
              src={`${import.meta.env.VITE_IMAGE_BASE_URL}${movie.poster_path}`}
              alt={movie.title}
            />
            <div className="movie-card-details">
              <h4 className="movie-card-details__title">{movie.title}</h4>
              <h4 className="movie-card-details__release-date">
                Release Date: {movie.release_date}
              </h4>
              <p className="movie-card-details__overview">{movie.overview}</p>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
