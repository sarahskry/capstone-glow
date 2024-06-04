import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Register() {
    const [ registered, setRegistered ] = useState(false);
    const [ error, setError ] = useState(null);

    return (
        <>
            <form
                onSubmit={async (event) => {
                    event.preventDefault();

                    setError(null);
                    setRegistered(false);

                    const name = event.target.name.value;
                    const email = event.target.email.value;
                    const username = event.target.username.value;
                    const password = event.target.password.value;
                    if (!username || !password) {
                        alert("username and password required");
                        return;
                    }

                    try {
                        // register 
                        await axios.post(
                            `${import.meta.env.VITE_LOCALHOST}register`, {
                                name,
                                email,
                                username,
                                password,
                            });
                            setRegistered(true);
                    } catch (err) {
                        console.log(err);
                        setError(err?.response?.data);
                    }
                }}
            >
                <input name="name" placeholder="name" />
                <input name="username" placeholder="username" />
                <input name="email" placeholder="email address" type="email" />
                <input name="password" placeholder="password" type="password" />
                <button>Register</button>
                {registered && <div>Registration successful, you can login!</div>}
                {error && <div>{error}</div>}
            </form>

            <p>Already have an account?</p>
            <Link to="/login">Login</Link>
        </>
    );
}