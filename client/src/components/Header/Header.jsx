import './Header.scss';
import { Link } from 'react-router-dom';

import { User } from "../User/User"

function Header() {
    return (
        <header className="header">
            <Link to='/dashboard'>
                <h1 className="header__title">GLOW</h1>
                <img src="../src/assets/logo/glow-logo.png" alt="3D movie glasses glow logo" className="header__logo" />
            </Link>

            <nav className="usernav">
                <ul className="usernav__list">
                    <li className="usernav__list--item">Watched</li>
                    <li className="usernav__list--item">To Watch</li>
                    <li className="usernav__list--item">Lists</li>
                </ul>
            </nav>

            <div className="header__userprofile">
                <User />
            </div>

        </header>
    )
}

export default Header;