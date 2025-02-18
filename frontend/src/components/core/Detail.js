import React, { useState, useEffect } from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import { Link, useParams } from "react-router-dom";
import apiInstance from "../../utils/axios";
import moment from "moment";
import Toast from "../../Plugin/Toast";
import "../../styles/detail.css"; // Create this CSS file

function Detail() {
  const [post, setPost] = useState([]);
  const [tags, setTags] = useState([]);
  const [createComment, setCreateComment] = useState({ full_name: "", email: "", comment: "" });

  const param = useParams();

  const fetchPost = async () => {
      const response = await apiInstance.get(`post/detail/${param.slug}/`);
      setPost(response.data);

      const tagArray = response.data?.tags?.split(",");
      setTags(tagArray);
  };

  useEffect(() => {
      fetchPost();
  }, []);

  const handleCreateCommentChange = (event) => {
      setCreateComment({
          ...createComment,
          [event.target.name]: event.target.value,
      });
  };

  const handleCreateCommentSubmit = async (e) => {
      e.preventDefault();

      console.log(post.id);
      console.log(createComment.full_name);
      console.log(createComment.email);
      console.log(createComment.comment);

      const jsonData = {
          post_id: post?.id,
          name: createComment.full_name,
          email: createComment.email,
          comment: createComment.comment,
      };

      const response = await apiInstance.post(`post/comment-post/`, jsonData);
      console.log(response);
      fetchPost();
      Toast("success", "Comment Posted.", "");
      setCreateComment({
          full_name: "",
          email: "",
          comment: "",
      });
  };

    return (
        <div className="detail-container">
            <Header />
            
            <section className="detail-header">
                <div className="header-content">
                    <div className="category-badge">
                        <i className="fas fa-tag"></i>
                        {post.category?.title}
                    </div>
                    <h1 className="post-title">{post.title}</h1>
                </div>
            </section>

            <section className="post-content">
                <div className="author-sidebar">
                    <div className="author-profile">
                        <img 
                            className="author-avatar"
                            src={post.profile?.image} 
                            alt="author avatar" 
                        />
                        <h3 className="author-name">{post.profile?.full_name}</h3>
                        <p className="author-bio">{post.profile?.bio}</p>
                        
                        <div className="post-meta">
                            <div className="meta-item">
                                <i className="fas fa-calendar"></i>
                                {moment(post.date).format("DD MMM, YYYY")}
                            </div>
                            <div className="meta-item">
                                <i className="fas fa-eye"></i>
                                {post.view} Views
                            </div>
                            <div className="meta-item">
                                <i className="fas fa-heart"></i>
                                {post.likes?.length} Likes
                            </div>
                        </div>

                        <div className="post-tags">
                            {tags?.map((t, index) => (
                                <span key={index} className="tag">
                                    #{t}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="main-content">
                    <div 
                        className="post-description" 
                        dangerouslySetInnerHTML={{ __html: post.description }} 
                    />

                    <div className="author-card">
                        <img
                            className="author-image"
                            src={post.profile?.image}
                            alt="author"
                        />
                        <div className="author-info">
                            <h3>{post.profile?.full_name}</h3>
                            <p className="author-bio">{post.profile?.bio}</p>
                            <p className="author-about">{post.profile?.about}</p>
                            
                            <div className="social-links">
                                {post.profile?.facebook && (
                                    <a href={post.facebook} target="_blank" rel="noreferrer">
                                        <i className="fab fa-facebook"></i>
                                    </a>
                                )}
                                {post.profile?.twitter && (
                                    <a href={post.twitter} target="_blank" rel="noreferrer">
                                        <i className="fab fa-twitter"></i>
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="comments-section">
                        <h2>{post.comments?.length} Comments</h2>
                        
                        {post.comments?.map((c, index) => (
                            <div className="comment-card" key={index}>
                                <img
                                    className="comment-avatar"
                                    src="https://via.placeholder.com/70"
                                    alt="comment avatar"
                                />
                                <div className="comment-content">
                                    <div className="comment-header">
                                        <h4>{c.name}</h4>
                                        <span>{moment(c.date).format("DD MMM, YYYY")}</span>
                                    </div>
                                    <p className="comment-text">{c.comment}</p>
                                    {c.reply && (
                                        <div className="comment-reply">
                                            <p>Reply: {c.reply}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="comment-form">
                        <h2>Leave a Reply</h2>
                        <p>Your email address will not be published. Required fields are marked *</p>
                        
                        <form onSubmit={handleCreateCommentSubmit}>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Name *</label>
                                    <input
                                        type="text"
                                        name="full_name"
                                        value={createComment.full_name}
                                        onChange={handleCreateCommentChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={createComment.email}
                                        onChange={handleCreateCommentChange}
                                        required
                                    />
                                </div>
                            </div>
                            
                            <div className="form-group">
                                <label>Comment *</label>
                                <textarea
                                    name="comment"
                                    value={createComment.comment}
                                    onChange={handleCreateCommentChange}
                                    rows="4"
                                    required
                                ></textarea>
                            </div>
                            
                            <button type="submit" className="submit-button">
                                Post Comment <i className="fas fa-paper-plane"></i>
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default Detail;