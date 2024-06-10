import "./Login.scss";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ setToken }) {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  return (
    <>
      <div className="reg-content">
        <div className="reg-container">
          <div className="logo-container">
            <h1 className="reglogin-title">GLOW</h1>
            <img
              src="../src/assets/logo/glow-logo.png"
              alt="3D movie glasses glow logo"
              className="reglogin-logo glow"
            />
          </div>
          <form
            className="loginform"
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
                const { data } = await axios.post(
                  `${import.meta.env.VITE_LOCALHOST}login`,
                  { username, password }
                );
                const { token } = data;

                // set in localstorage
                localStorage.setItem("token", token);
                // set in react state
                setToken(token);
                navigate("/dashboard");
              } catch (err) {
                setError(err?.response?.data || "something went wrong");
              }
            }}
          >
            <div className="loginform__labelinput-pair">
              <label
                className="loginform__labelinput-pair--label"
                htmlFor="username"
              >
                {" "}
                Username{" "}
              </label>
              <input
                className="loginform__labelinput-pair--input"
                name="username"
                id="username"
                placeholder="username"
              />
            </div>
            <div className="loginform__labelinput-pair">
              <label
                className="loginform__labelinput-pair--label"
                htmlFor="password"
              >
                {" "}
                Password
              </label>
              <input
                className="loginform__labelinput-pair--input"
                name="password"
                id="password"
                placeholder="password"
                type="password"
              />
            </div>
            <button className="loginbutton">Login</button>
            {error && <div>{error}</div>}
          </form>
        </div>
        <img
          src="../src/assets/images/audience.jpeg"
          alt=""
          className="login-image"
        />
      </div>
    </>
  );
}
