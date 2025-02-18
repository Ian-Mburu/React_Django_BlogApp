import React, { useEffect } from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import { Link } from "react-router-dom";
import { logout } from "../../utils/auth";
import "../../styles/Auth.css";

function Logout() {
    useEffect(() => {
        logout();
    }, []);

    return (
        <>
            <Header />
            <section className="auth-container">
                <div className="auth-card">
                    <div className="auth-header">
                        <h1 className="auth-title">You have been logged out</h1>
                        <p className="auth-subtitle">Thanks for visiting our website, come back anytime!</p>
                    </div>
                    <div className="flex-between">
                        <Link to="/login" className="auth-button">
                            Login <i className="fas fa-sign-in-alt"></i>
                        </Link>
                        <Link to="/register" className="auth-button">
                            Register <i className="fas fa-user-plus"></i>
                        </Link>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default Logout;