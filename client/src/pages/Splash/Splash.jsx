import { useNavigate } from 'react-router-dom';
import './Splash.scss';
import { useEffect } from 'react';


export default function Splash() {

    const navigate = useNavigate();

    // useEffect(() => {
    //     // setting timeout to navigate to reg page after a few seconds
    //     const timer = setTimeout(() => {
    //         navigate("/register"); 
    //     }, 5000); // after 5 seconds

    //     // don't want to timer to keep going, so we need to remove
    //     return () => clearTimeout(timer);
    // }, [navigate]);

    return (

       <>
       <div className="splash-container">
            <div className="glowing-rectangle">
                
            </div>
       </div>
       </>
      
    )

};