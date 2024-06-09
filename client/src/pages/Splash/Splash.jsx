import { useNavigate, Link } from 'react-router-dom';
import './Splash.scss';
import { useEffect } from 'react';


export default function Splash() {

    return (

       <>
       <div className="splash-container">
            <div className="glowing-rectangle"></div>
            <Link to="/register">
                <div className="splash-container__redirect">
                    <h3 className="sign">Glow this way</h3>
                    <img src="../../src/assets/icons/noun-right.svg" alt="hand with finger pointing to the right" className="finger-icon" />
                </div>
            </Link>
       </div>
       </>
      
    )

};