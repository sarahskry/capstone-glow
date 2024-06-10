import Header from "../../components/Header/Header";
import { useState, useEffect } from "react";
import axios from "axios";

export default function WatchedPage({ token }) {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        if(token) {
            fetchWatchedMovies();
        }
    }, [token]);

    async function fetchWatchedMovies() {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_LOCALHOST}watched`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setMovies(response.data);
        } catch (err) {
            console.error("Error fetching watched movies", err);
        }
    }

    return (
        <>
            <Header />

            <h3>All the movies you've watched</h3>
            {movies.map((movie) => (
                <div key={movie.movie_id}>{movie.movie_id}</div>
            ))}
        </>
    );

}