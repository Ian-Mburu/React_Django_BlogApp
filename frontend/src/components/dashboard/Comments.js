import React, { useState, useEffect } from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import { Link } from "react-router-dom";
import apiInstance from "../../utils/axios";
import moment from "moment";
import Moment from "../../Plugin/Moment";
import Toast from "../../Plugin/Toast";
import "../../styles/dashboard/comments.css"; // Import custom CSS

function Comments() {
    const [comments, setComments] = useState([]);
    const [reply, setReply] = useState("");
    const [openReply, setOpenReply] = useState(null); // Manage reply visibility

    const fetchComment = async () => {
        const response = await apiInstance.get(`author/dashboard/comment-list/`);
        setComments(response.data);
    };

    useEffect(() => {
        fetchComment();
    }, []);

    const handleSubmitReply = async (commentId) => {
        try {
            await apiInstance.post(`author/dashboard/reply-comment/`, {
                comment_id: commentId,
                reply: reply,
            });
            fetchComment();
            Toast("success", "Reply Sent.", "");
            setReply("");
            setOpenReply(null);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Header />
            <section className="comments-section">
                <div className="container">
                    <h2 className="section-title">Comments</h2>
                    <p className="section-description">Manage your comments and replies.</p>

                    <div className="comments-list">
                        {comments.map((c) => (
                            <div key={c.id} className="comment-card">
                                <div className="comment-header">
                                    <img
                                        src="https://as1.ftcdn.net/v2/jpg/03/53/11/00/1000_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg"
                                        alt="avatar"
                                        className="comment-avatar"
                                    />
                                    <div>
                                        <h4 className="comment-author">{c.name}</h4>
                                        <span className="comment-date">{Moment(c.date)}</span>
                                    </div>
                                </div>
                                <p className="comment-text">
                                    <strong>Comment:</strong> {c.comment}
                                </p>
                                <p className="comment-text">
                                    <strong>Response:</strong> {c.reply || <span className="no-reply">No Reply</span>}
                                </p>
                                <button className="reply-btn" onClick={() => setOpenReply(openReply === c.id ? null : c.id)}>
                                    {openReply === c.id ? "Cancel" : "Reply"}
                                </button>
                                {openReply === c.id && (
                                    <div className="reply-box">
                                        <textarea
                                            onChange={(e) => setReply(e.target.value)}
                                            value={reply}
                                            className="reply-input"
                                            rows="3"
                                            placeholder="Write your reply..."
                                        />
                                        <button onClick={() => handleSubmitReply(c.id)} className="send-reply-btn">
                                            Send
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default Comments;
