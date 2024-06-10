import Header from "../../components/Header/Header";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Lists({ token }) {
  const [lists, setLists] = useState([]);
  const [movies, setMovies] = useState([]);
  const [selectedListId, setSelectedListId] = useState(null);

  useEffect(() => {
    if (token) {
      fetchLists();
    }
  }, [token]);

  async function fetchLists() {
    try {
      const response = await axios.get(`${import.meta.env.VITE_LOCALHOST}lists`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLists(response.data.lists);
    } catch (err) {
      console.error("Error fetching lists", err);
    }
  }

  async function fetchMovies(listId) {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_LOCALHOST}watched/list/${listId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMovies(response.data);
      setSelectedListId(listId);
    } catch (err) {
      console.error("Error fetching movies", err);
    }
  }

  return (
    <div>
      <h2>Your Movie Lists</h2>
      {lists.map((list) => (
        <div key={list.id} onClick={() => fetchMovies(list.id)}>
          {list.list_title}
        </div>
      ))}

      {selectedListId && (
        <div>
          <h2>Movies in Selected List</h2>
          {movies.map((movie) => (
            <div key={movie.movie_id}>{movie.movie_id}</div>
          ))}
        </div>
      )}
    </div>
  );
}
