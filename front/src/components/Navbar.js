import React, { useContext } from 'react';
import { AuthContext } from '../auth';


const Navbar = () => {
    const { currentUser } = useContext(AuthContext);

    const logout = () => {
        localStorage.setItem('user', "");
        window.location.href = "/";
    }
     
    return ( 
        <header>
            <h1>Chat React - Socket.io</h1>
            {currentUser ? 
                <nav>
                    {/* <h2>{currentUser.username}</h2> */}
                    <button title="Cerrar sesión" className="logout" onClick={logout}>Cerrar sesi&oacute;n</button>
                </nav>
            :
                <></>
            }
        </header>
    );
}
 
export default Navbar;