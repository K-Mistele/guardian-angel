import React from 'react';
import ghostLogo from '../images/ghostLogo.png';
import {Link} from 'react-router-dom';

function Header() {
    const navStyle = {
        color: 'white'
    }
    function logout(){
        localStorage.removeItem("bearer_token");
        window.location.replace("http://localhost:3000/")
    }
    if(!("bearer_token" in localStorage)){
        return (
            <nav className = "navbar navbar-expand-lg navbar-light bg-secondary">
                <div className = "navbar-brand">
                    <img src = {ghostLogo} width="40" height="40" className="d-flex align-items-center" alt=""/>
                </div>
                
                <div className = "collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className = "navbar-nav ml-auto ">
                        <Link style={navStyle} to="/">
                            <li className = "nav-item active mx-2">
                                Home
                            </li>
                        </Link>
                    </ul>
                </div>
                
            </nav>
    )
    } else{
        return (
            <nav className = "navbar navbar-expand-lg navbar-light bg-secondary">
                <div className = "navbar-brand">
                    <img src = {ghostLogo} width="40" height="40" className="d-flex align-items-center" alt=""/>
                </div>
                
                <div className = "collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className = "navbar-nav ml-auto ">
                        <Link style={navStyle} to="/">
                            <li className = "nav-item active mx-2">
                                Home
                            </li>
                        </Link>
                        <Link style={navStyle} to="/myprofile">
                            <li className = "nav-item active mx-2">
                                Profile
                            </li>
                        </Link>
                        <Link style={navStyle} to="/reportsighting">
                            <li className = "nav-item active mx-2 ">
                                Report Sighting
                            </li>
                        </Link>
                        <Link style={navStyle} to="/createghost">
                            <li className = "nav-item active mx-2 ">
                                Create Ghost
                            </li>
                        </Link>
                        <Link style={navStyle} to="/viewghosts">
                            <li className = "nav-item active mx-2 ">
                                View Ghosts
                            </li>
                        </Link>
                        <Link style={navStyle} to="/viewsightings">
                            <li className = "nav-item active mx-2 ">
                                View Sightings
                            </li>
                        </Link>
                        <Link style={navStyle} to = "/" onClick={logout}>
                            <li className = "nav-item active mx-2 ">
                                Log Out
                            </li>
                        </Link>
                    </ul>
                </div>
                
            </nav>
    )
    };
    
}

export default Header;
 