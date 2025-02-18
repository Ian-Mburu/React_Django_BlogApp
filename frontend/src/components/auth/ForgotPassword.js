import React, { useState } from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import apiInstance from "../../utils/axios";
import Swal from "sweetalert2";
import "../../styles/Auth.css";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleEmailSubmit = async () => {
        try {
            setIsLoading(true);
            await apiInstance.get(`user/password-reset/${email}/`).then((res) => {
                setEmail("");
                Swal.fire({
                    icon: "success",
                    title: "Password Reset Email Sent!",
                });
            });
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };

    return (
        <>
            <Header />
            <section className="auth-container">
                <div className="auth-card">
                    <div className="auth-header">
                        <h1 className="auth-title">Forgot Password</h1>
                        <p className="auth-subtitle">Let's help you get back into your account</p>
                    </div>
                    <div className="auth-form">
                        <div>
                            <label className="auth-label" htmlFor="email">
                                Email Address
                            </label>
                            <input
                                type="email"
                                className="auth-input"
                                placeholder="johndoe@gmail.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            {isLoading ? (
                                <button disabled className="auth-button">
                                    Processing <i className="fas fa-spinner fa-spin"></i>
                                </button>
                            ) : (
                                <button onClick={handleEmailSubmit} className="auth-button">
                                    Reset Password <i className="fas fa-arrow-right"></i>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default ForgotPassword;