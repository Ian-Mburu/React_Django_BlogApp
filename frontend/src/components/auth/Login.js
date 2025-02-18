import React, { useState } from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import { Link, useNavigate } from "react-router-dom";
// import { useAuthStore } from "../../Store/Auth";
import { login } from "../../utils/auth";
import "../../styles/Auth.css";

function Login() {
    const [bioData, setBioData] = useState({ email: "", password: "" });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleBioDataChange = (event) => {
        setBioData({
            ...bioData,
            [event.target.name]: event.target.value,
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const { error } = await login(bioData.email, bioData.password);
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
                        <h1 className="auth-title">Sign In</h1>
                        <p className="auth-subtitle">
                            Don’t have an account? <Link to="/register" className="auth-link">Sign up</Link>
                        </p>
                    </div>
                    <form className="auth-form" onSubmit={handleLogin}>
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

                        <div className="flex-between">
                            <div>
                                <input type="checkbox" id="rememberme" />
                                <label htmlFor="rememberme" className="auth-label">
                                    Remember me
                                </label>
                            </div>
                            <Link to="/forgot-password" className="auth-link">
                                Forgot your password?
                            </Link>
                        </div>

                        <div>
                            {isLoading ? (
                                <button disabled className="auth-button">
                                    Processing <i className="fas fa-spinner fa-spin"></i>
                                </button>
                            ) : (
                                <button type="submit" className="auth-button">
                                    Sign In <i className="fas fa-sign-in-alt"></i>
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

export default Login;