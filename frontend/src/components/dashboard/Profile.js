import React, { useState, useEffect } from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import { Link } from "react-router-dom";

import apiInstance from "../../utils/axios";
import useUserData from "../../Plugin/useUserData";
import Toast from "../../Plugin/Toast";
import "../../styles/dashboard/profile.css"; // Ensure you create a CSS file for styling

function Profile() {
    const [profileData, setProfileData] = useState({
        image: null,
        full_name: "",
        about: "",
        bio: "",
        facebook: "",
        twitter: "",
        country: "",
    });
    const userId = useUserData()?.user_id;

    const [imagePreview, setImagePreview] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchProfile = () => {
        apiInstance.get(`user/profile/${userId}/`).then((res) => {
            setProfileData(res.data);
        });
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const handleProfileChange = (event) => {
        setProfileData({
            ...profileData,
            [event.target.name]: event.target.value,
        });
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setProfileData({
            ...profileData,
            image: selectedFile,
        });

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        if (selectedFile) {
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const res = await apiInstance.get(`user/profile/${userId}/`);

        const formData = new FormData();
        if (profileData.image && profileData.image !== res.data.image) {
            formData.append("image", profileData.image);
        }
        formData.append("full_name", profileData.full_name);
        formData.append("about", profileData.about);
        formData.append("facebook", profileData.facebook);
        formData.append("twitter", profileData.twitter);
        formData.append("country", profileData.country);

        try {
            await apiInstance.patch(`user/profile/${userId}/`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            Toast("success", "Profile updated successfully", "");
        } catch (error) {
            console.error("Error updating profile:", error);
            Toast("error", "An Error Occurred", "");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Header />
            <section className="profile-container">
                <div className="profile-card">
                    <h2>Profile Details</h2>
                    <p>Manage your account settings below.</p>
                    <form onSubmit={handleFormSubmit} className="profile-form">
                        <div className="profile-avatar-section">
                            <img
                                src={imagePreview || profileData?.image}
                                alt="Profile Avatar"
                                className="profile-avatar"
                            />
                            <div>
                                <p>Your Avatar</p>
                                <input type="file" name="image" onChange={handleFileChange} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Full Name</label>
                            <input type="text" name="full_name" value={profileData.full_name} onChange={handleProfileChange} />
                        </div>
                        <div className="form-group">
                            <label>About Me</label>
                            <textarea name="about" rows="4" value={profileData.about} onChange={handleProfileChange}></textarea>
                        </div>
                        <div className="form-group">
                            <label>Bio</label>
                            <input type="text" name="bio" value={profileData.bio} onChange={handleProfileChange} />
                        </div>
                        <div className="form-group">
                            <label>Country</label>
                            <input type="text" name="country" value={profileData.country} onChange={handleProfileChange} />
                        </div>
                        <div className="form-group">
                            <label>Facebook</label>
                            <input type="text" name="facebook" value={profileData.facebook} onChange={handleProfileChange} />
                        </div>
                        <div className="form-group">
                            <label>Twitter</label>
                            <input type="text" name="twitter" value={profileData.twitter} onChange={handleProfileChange} />
                        </div>
                        <button type="submit" className="btn-primary" disabled={loading}>
                            {loading ? "Updating..." : "Update Profile"}
                        </button>
                    </form>
                    <li><Link className="dropdown-item" to="/dashboard/"><i className="icon-dashboard"></i> Dashboard</Link></li>
                                    <li><Link className="dropdown-item" to="/posts/"><i className="icon-posts"></i> Posts</Link></li>
                                    <li><Link className="dropdown-item" to="/add-post/"><i className="icon-add-post"></i> Add Post</Link></li>
                                    <li><Link className="dropdown-item" to="/comments/"><i className="icon-comments"></i> Comments</Link></li>
                                    <li><Link className="dropdown-item" to="/notifications/"><i className="icon-notifications"></i> Notifications</Link></li>
                                    <li><Link className="dropdown-item" to="/profile/"><i className="icon-profile"></i> Profile</Link></li>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default Profile;
