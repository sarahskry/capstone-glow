import "./Register/Register.scss";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Register() {
  const [registered, setRegistered] = useState(false);
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
            className="regform"
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
                await axios.post(`${import.meta.env.VITE_LOCALHOST}register`, {
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
            <div className="regform__labelinput-pair">
              <label className="regform__labelinput-pair--label" htmlFor="name">
                Name
              </label>
              <input
                className="regform__labelinput-pair--label"
                name="name"
                id="name"
                placeholder="name"
              />
            </div>

            <div className="regform__labelinput-pair">
              <label
                className="regform__labelinput-pair--label"
                htmlFor="username"
              >
                {" "}
                Username{" "}
              </label>
              <input
                className="regform__labelinput-pair--label"
                name="username"
                id="username"
                placeholder="username"
              />
            </div>

            <div className="regform__labelinput-pair">
              <label
                className="regform__labelinput-pair--label"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="regform__labelinput-pair--input"
                name="email"
                id="email"
                placeholder="email address"
                type="email"
              />
            </div>

            <div className="regform__labelinput-pair">
              <label
                className="regform__labelinput-pair--label"
                htmlFor="password"
              >
                {" "}
                Password
              </label>
              <input
                className="regform__labelinput-pair--label"
                name="password"
                id="password"
                placeholder="password"
                type="password"
              />
            </div>

            <div className="reg-cta">
              <button className="regbutton">Register</button>
            </div>

            {registered && <div>Registration successful, you can login!</div>}
            {error && <div>{error}</div>}
          </form>
        </div>
        <div className="loginbtn-container">
            <p>Already have an account?</p>
            <Link to="/login">
            <button>Login</button>
            </Link>
        </div>
{/* Everything from title to Reg button**************************************************** */}

        <img
          src="../src/assets/images/audience.jpeg"
          alt=""
          className="login-image"
        />
      </div>
    </>
  );
}
