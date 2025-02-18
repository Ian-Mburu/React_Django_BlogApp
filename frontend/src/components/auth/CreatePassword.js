import React, { useState } from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import { useNavigate, useSearchParams } from "react-router-dom";
import apiInstance from "../../utils/axios";
import Toast from "../../Plugin/Toast";
import "../../styles/Auth.css";

export default function CreatePassword() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const otp = searchParams.get("otp");
    const uidb64 = searchParams.get("uidb64");
    const reset_token = searchParams.get("reset_token");

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        if (password !== confirmPassword) {
            setIsLoading(false);
            Toast().fire({
                icon: "warning",
                text: "Password Does Not Match",
            });
        } else {
            setIsLoading(true);

            const formdata = new FormData();
            formdata.append("otp", otp);
            formdata.append("uidb64", uidb64);
            formdata.append("reset_token", reset_token);
            formdata.append("password", password);

            try {
                apiInstance.post(`user/password-change/`, formdata).then((res) => {
                    Toast().fire({
                        icon: "success",
                        text: "Password Changed Successfully",
                    });
                    navigate("/login");
                });
            } catch (error) {
                console.log(error);
                Toast().fire({
                    icon: "error",
                    title: "An Error Occured Try Again",
                });
                setIsLoading(false);
            }
        }
    };

    return (
        <>
            <Header />
            <section className="auth-container">
                <div className="auth-card">
                    <div className="auth-header">
                        <h1 className="auth-title">Create New Password</h1>
                        <p className="auth-subtitle">Choose a new password for your account</p>
                    </div>
                    <form className="auth-form" onSubmit={handlePasswordSubmit}>
                        <div>
                            <label className="auth-label" htmlFor="password">
                                Enter New Password
                            </label>
                            <input
                                type="password"
                                className="auth-input"
                                placeholder="**************"
                                required
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="auth-label" htmlFor="confirmPassword">
                                Confirm New Password
                            </label>
                            <input
                                type="password"
                                className="auth-input"
                                placeholder="**************"
                                required
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>

                        <div>
                            {isLoading ? (
                                <button disabled className="auth-button">
                                    Processing <i className="fas fa-spinner fa-spin"></i>
                                </button>
                            ) : (
                                <button type="submit" className="auth-button">
                                    Save New Password <i className="fas fa-check-circle"></i>
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