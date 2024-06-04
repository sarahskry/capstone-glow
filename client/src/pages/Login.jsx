import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ setToken }) {
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    return (
        <>
            <form
            onSubmit={async (event) => {
                event.preventDefault();

                setError(null);

                const username = event.target.username.value;
                const password = event.target.password.value;

                if (!username || !password) {
                    alert("a username and password is required to login");
                    return;
                }

                // payload has the token
                try {
                    const { data } = await axios.post(`${import.meta.env.VITE_LOCALHOST}login}`, { username, password });
                    const { token } = data;

                    // set in localstorage
                    localStorage.setItem('token', token);
                    // set in react state
                    setToken(token);
                    navigate('/dashboard');
                } catch (err) {
                    setError(err?.response?.data || "something went wrong");
                }
            }}
            >
                <input name="username" placeholder="username" />
                <input name="password" placeholder="password" type="password" />
                <button>Login</button>
                {error && <div>{error}</div>}
            </form>
        </>
    );
}