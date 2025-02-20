import React, { useState, useEffect } from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import apiInstance from "../../utils/axios";
import useUserData from "../../Plugin/useUserData";
import Toast from "../../Plugin/Toast";
import "../../styles/dashboard/notifications.css";

function Notifications() {
    const [noti, setNoti] = useState([]);
    const userId = useUserData()?.user_id;

    useEffect(() => {
        const fetchNoti = async () => {
            const response = await apiInstance.get(`author/dashboard/noti-list/${userId}/`);
            setNoti(response.data);
        };
        fetchNoti();
    }, [userId]);

    const handleMarkNotiAsSeen = async (notiId) => {
        await apiInstance.post("author/dashboard/noti-mark-seen/", { noti_id: notiId });
        Toast("success", "Notification Seen", "");
        setNoti(noti.filter(n => n.id !== notiId));
    };

    return (
        <>
            <Header />
            <section className="notifications">
                <div className="container">
                    <h3>Notifications</h3>
                    <p>Manage all your notifications from here</p>
                    <ul className="notifications-list">
                        {noti.length > 0 ? (
                            noti.map((n) => (
                                <li key={n.id} className="notification-item">
                                    <div className="notification-content">
                                        <span className={`icon ${n.type.toLowerCase()}`}></span>
                                        <div className="text">
                                            <h6>{n.type}</h6>
                                            <p>
                                                {n.type === "Like" && `Someone liked your post "${n.post?.title?.slice(0, 30)}..."`}
                                                {n.type === "Comment" && `You have a new comment on "${n.post?.title?.slice(0, 30)}..."`}
                                                {n.type === "Bookmark" && `Someone bookmarked your post "${n.post?.title?.slice(0, 30)}..."`}
                                            </p>
                                            <span className="timestamp">5 min ago</span>
                                            <button onClick={() => handleMarkNotiAsSeen(n.id)} className="mark-seen">
                                                ✓ Mark as Seen
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))
                        ) : (
                            <p>No notifications yet</p>
                        )}
                    </ul>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default Notifications;
