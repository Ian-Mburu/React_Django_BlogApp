import React from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../Store/Auth";
import "../../styles/header.css"; 
import positivityLogo from "../../images/positivity.png";


function Header() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const user = useAuthStore((state) => state.user);
    
    return (
        <header className="header-container">
            <nav className="nav-wrapper">
                <div className="nav-content">
                    <Link className="logo-link" to="/">
                        <img className="logo-img" src={positivityLogo} alt="logo" />
                        Verse Vibe
                    </Link>
                    

                    <div className="nav-main">
                        <div className="search-container">
                        <input className="search-input" type="search" placeholder="Search Articles" />
                            <form className="search-form">
                                <Link to="/search/" className="search-button">
                                    <i className="search-icon">⌕</i>
                                </Link>
                            </form>
                        </div>

                        <ul className="nav-links">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/categories">Category</Link>
                            </li>
                            
                            <li className="nav-item dropdown">
                                <span className="dropdown-toggle">Pages</span>
                                <ul className="dropdown-menu">
                                    <li>
                                        <Link className="dropdown-item" to="/about/">
                                            <i className="icon-user"></i> About
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/contact/">
                                            <i className="icon-phone"></i> Contact
                                        </Link>
                                    </li>
                                </ul>
                            </li>

                            <li className="nav-item">
                                    <li><Link className="nav-link" to="/add-post/"><i className="icon-add-post"></i> Add Post</Link></li>
                                    
                            </li>
                            <li><Link className="nav-link" to="/profile/"><i className="icon-profile"></i> Profile</Link></li>

                            <li className="auth-buttons">
                                {isLoggedIn() ? (
                                    <>
                                        <Link to="/dashboard/" className="btn-dashboard">
                                            Dashboard <i className="icon-grid"></i>
                                        </Link>
                                        <Link to="/logout/" className="btn-logout">
                                            Logout <i className="icon-logout"></i>
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <Link to="/register/" className="btn-register">
                                            Register <i className="icon-register"></i>
                                        </Link>
                                        <Link to="/login/" className="btn-login">
                                            Login <i className="icon-login"></i>
                                        </Link>
                                    </>
                                )}
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;