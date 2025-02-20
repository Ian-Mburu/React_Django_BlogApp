import React from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../Store/Auth";
import "../../styles/header.css"; // Create this CSS file

function Header() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const user = useAuthStore((state) => state.user);
    
    return (
        <header className="header-container">
            <nav className="nav-wrapper">
                <div className="nav-content">
                    <Link className="logo-link" to="/">
                        <img className="logo-image" src="https://i.postimg.cc/ZRNC1mhM/my-main-logo.png" alt="logo" />
                    </Link>
                    
                    <input type="checkbox" id="mobile-menu-toggle" className="mobile-menu-toggle" />
                    <label htmlFor="mobile-menu-toggle" className="mobile-menu-button">
                        <span className="menu-label">Menu</span>
                        <span className="hamburger-icon"></span>
                    </label>

                    <div className="nav-main">
                        <div className="search-container">
                            <form className="search-form">
                                <input className="search-input" type="search" placeholder="Search Articles" />
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
                                <Link className="nav-link" to="/category/">Category</Link>
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

                            <li className="nav-item dropdown">
                                <span className="dropdown-toggle">Dashboard</span>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="/dashboard/"><i className="icon-dashboard"></i> Dashboard</Link></li>
                                    <li><Link className="dropdown-item" to="/posts/"><i className="icon-posts"></i> Posts</Link></li>
                                    <li><Link className="dropdown-item" to="/add-post/"><i className="icon-add-post"></i> Add Post</Link></li>
                                    <li><Link className="dropdown-item" to="/comments/"><i className="icon-comments"></i> Comments</Link></li>
                                    <li><Link className="dropdown-item" to="/notifications/"><i className="icon-notifications"></i> Notifications</Link></li>
                                    <li><Link className="dropdown-item" to="/profile/"><i className="icon-profile"></i> Profile</Link></li>
                                </ul>
                            </li>

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