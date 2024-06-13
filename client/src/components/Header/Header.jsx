import "./Header.scss";
import { Link, NavLink } from "react-router-dom";
import { User } from "../User/User";

function Header() {
  return (
    <header className="header">
      <Link to="/dashboard" className="glow-container">
        <h1 className="header__title">GLOW</h1>
        <img
          src="../src/assets/logo/glow-logo.png"
          alt="3D movie glasses glow logo"
          className="header__logo"
        />
      </Link>

      <nav className="usernav">
        <ul className="usernav__list">
          <NavLink
            to="/watched"
            className={({ isActive }) => (isActive ? 'usernav__link active' : 'usernav__link')}
          >
            <li className="usernav__list--item">Watched</li>
          </NavLink>
          {/* <li className="usernav__list--item">To Watch</li> */}
          <NavLink
            to="/lists"
            className={({ isActive }) => (isActive ? 'usernav__link active' : 'usernav__link')}
          >
            <li className="usernav__list--item">Movie Lists</li>
          </NavLink>
        </ul>
      </nav>

      <div className="header__userprofile">
        <User />
      </div>
    </header>
  );
}

export default Header;
