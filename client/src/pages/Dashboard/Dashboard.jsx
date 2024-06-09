import Header from "../../components/Header/Header";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { MovieSearch } from "../../components/MovieSearch/MovieSearch";
import MovieSearchResults from "../../components/MovieSearchResults/MovieSearchResults";


export default function UserDashboard({ token }) {
  const [user, setUser] = useState(null);
  const [lists, setLists] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [results, setResults] = useState([]);
  // const [currentList, setCurrentList] = useState(null)

  useEffect(() => {
    // if the token was passed in, get the user profile
    if (token) {
      getProfile();
    } else {
      // otherwise, there is no token and we need to logout and set the user back to null
      setUser(null);
    }
  }, [token]);

  async function getProfile() {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_LOCALHOST}dashboard`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("User data:", response.data);
      setUser(response.data.user);
      setLists(response.data.lists);
      // setCurrentList(response.data.lists[0]) // SHOULD be Watched...
    } catch (error) {
      console.error("Error retrieving user", error);
      setUser(null);
    }
  }

  const fetchResults = async (query) => {
    if (!query) 
    return;

    const apiUrl = `${import.meta.env.VITE_BASE_URL}?api_key=${import.meta.env.VITE_API_KEY}&query=${query}`;

    try {
        const response = await axios.get(apiUrl);
        setResults(response.data.results || []);
        console.log(response.data);
    } catch (err) {
        console.error(`Error fetching the movie data:`, err);
        setResults([]);
    }
  };

  return (
    <>
      <Header />
      {user ? (
        <>
          <h3 className="userdash-greeting">
            Hi {user.username}, what are you watching?
          </h3>

          <div className="moviesearch-container">
            <MovieSearch onSearch={fetchResults}/>
          </div>

          <div className="search-results">
            <MovieSearchResults results={results} />
          </div>
  
          <div>You have {lists.length} lists.</div>

          <div>
            {lists.map((list) => {
              return (
                <div
                  key={list.id}
                  onClick={async () => {
                    const { data } = await axios.get(
                      `${import.meta.env.VITE_LOCALHOST}list/${list.id}`,
                      {
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                      }
                    );

                    setRatings(data);
                  }}
                >
                  {list.list_title}
                </div>
              );
            })}
          </div>

          <h2>Ratings</h2>

          {ratings.map((rating) => {
            console.log(rating);
            return <div key={rating.id}>{rating.movie_id}</div>;
          })}
        </>
      ) : (
        <p>Register or Login</p>
      )}
    </>
  );
}
