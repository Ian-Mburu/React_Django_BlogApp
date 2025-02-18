import React, { useState } from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../utils/auth";
import "../../styles/Auth.css";

function Register() {
    const [bioData, setBioData] = useState({ full_name: "", email: "", password: "", password2: "" });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleBioDataChange = (event) => {
        setBioData({
            ...bioData,
            [event.target.name]: event.target.value,
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const { error } = await register(bioData.full_name, bioData.email, bioData.password, bioData.password2);
        if (error) {
            alert(JSON.stringify(error));
        } else {
            navigate("/");
        }

        setIsLoading(false);
    };

    return (
        <>
            <Header />
            <section className="auth-container">
                <div className="auth-card">
                    <div className="auth-header">
                        <h1 className="auth-title">Sign Up</h1>
                        <p className="auth-subtitle">
                            Already have an account? <Link to="/login" className="auth-link">Sign In</Link>
                        </p>
                    </div>
                    <form className="auth-form" onSubmit={handleRegister}>
                        <div>
                            <label className="auth-label" htmlFor="full_name">
                                Full Name
                            </label>
                            <input
                                type="text"
                                className="auth-input"
                                placeholder="John Doe"
                                name="full_name"
                                value={bioData.full_name}
                                onChange={handleBioDataChange}
                                required
                            />
                        </div>

                        <div>
                            <label className="auth-label" htmlFor="email">
                                Email Address
                            </label>
                            <input
                                type="email"
                                className="auth-input"
                                placeholder="johndoe@gmail.com"
                                name="email"
                                value={bioData.email}
                                onChange={handleBioDataChange}
                                required
                            />
                        </div>

                        <div>
                            <label className="auth-label" htmlFor="password">
                                Password
                            </label>
                            <input
                                type="password"
                                className="auth-input"
                                placeholder="**************"
                                name="password"
                                value={bioData.password}
                                onChange={handleBioDataChange}
                                required
                            />
                        </div>

                        <div>
                            <label className="auth-label" htmlFor="password2">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                className="auth-input"
                                placeholder="**************"
                                name="password2"
                                value={bioData.password2}
                                onChange={handleBioDataChange}
                                required
                            />
                        </div>

                        <div>
                            {isLoading ? (
                                <button disabled className="auth-button">
                                    Processing <i className="fas fa-spinner fa-spin"></i>
                                </button>
                            ) : (
                                <button type="submit" className="auth-button">
                                    Sign Up <i className="fas fa-user-plus"></i>
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default Register;