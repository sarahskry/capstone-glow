import Header from "../components/Header/Header"
import { useEffect, useState } from "react"
import axios from "axios"

export default function UserDashboard({ token }) {
    const [user, setUser] = useState(null);

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
            const response = await axios.get(`${import.meta.env.VITE_LOCALHOST}dashboard`, {
                headers: {
                    Authorization:`Bearer ${token}`,
                },
            });
            console.log("User data:", response.data);
            setUser(response.data);
        } catch (error) {
            console.error("Error retrieving user", error);
            setUser(null);
        }
    }
        
    return (
        <>
            <Header />
            {user ? (
                <h3 className="userdash-greeting">
                    Hi {user.username}, what are you watching?
                </h3>
            ) : (
                <p>Register or Login</p>
            )}
        </>
    );
}