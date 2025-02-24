import { useState, useEffect } from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import { Link } from "react-router-dom";
import moment from "moment";
import apiInstance from "../../utils/axios";
import useUserData from "../../Plugin/useUserData";
import Toast from "../../Plugin/Toast";
import "../../styles/home.css";
import { CiBookmark } from "react-icons/ci";
import { MdOutlineThumbUp } from "react-icons/md";



function Home() {
    const [posts, setPosts] = useState([]);
    const userData = useUserData();
    const [category, setCategory] = useState([]);
    const [isLiking, setIsLiking] = useState(false);


    const fetchPosts = async () => {
        const response = await apiInstance.get(`post/lists/`);
        setPosts(response.data);
    };

    const fetchCategory = async () => {
        const response = await apiInstance.get(`post/category/list/`);
        setCategory(response.data);
    };

    useEffect(() => {
        fetchPosts();
        fetchCategory();
    }, []);


    // Pagination
    const itemsPerPage = 50;
    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const postItems = posts.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(posts.length / itemsPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    const handleLikePost = async (postId) => {
        try {
            const response = await apiInstance.post(`post/like-post/`, {
                post_id: postId  // Remove user_id
            });
            
            // Update local state immediately
            setPosts(prevPosts => prevPosts.map(post => 
                post.id === postId ? {
                    ...post,
                    likes_count: response.data.likes_count,
                    has_liked: response.data.action === 'liked'
                } : post
            ));
    
            Toast("success", response.data.message, "");
        } catch (error) {
            console.error("Like error:", error);
            if (error.response?.status === 401) {
                Toast("error", "Session expired. Please login again", "");
            } else {
                Toast("error", "Failed to like post", "");
            }
        }
    };

    const handleBookmarkPost = async (postId) => {
        try {
            const response = await apiInstance.post(`post/bookmark-post/`, {
                post_id: postId  // Remove user_id
            });
            fetchPosts();
            Toast("success", response.data.message, "");
        } catch (error) {
            console.error("Bookmark error:", error);
            if (error.response?.status === 401) {
                Toast("error", "Please login to bookmark posts", "");
            } else {
                Toast("error", "Failed to bookmark post", "");
            }
        }
    };
    
    return (
        <div>
            <Header />
            <div className="home-container">
                
                <section>
                    <div className="grid-container">
                        {postItems?.map((p, index) => (
                            <div className="grid-card" key={index}>
                                <Link to={`detail/${p.slug}`} className="card-link">
                                <div className="card-image-container">
                                    <img className="card-image" src={p.image} alt={p.title} />
                                </div>
                                <div className="card-content">
                                    <h3 className="card-title">
                                        
                                            {p.title?.slice(0, 32) + "..."}
                                        
                                    </h3>
                                    <div className="card-actions">
                                        <button type="button" onClick={() => handleBookmarkPost(p.id)} className="icon-btn">
                                        <CiBookmark />
                                        </button>
                                        <button onClick={() => handleLikePost(p.id)} className="icon-btn">
                                        <MdOutlineThumbUp />
                                        </button>
                                        <p style={{color: '#000'}}>{p.likes?.length} Likes</p>
                                    </div>
                                    <ul className="card-meta">
                                        <li>
                                            <i className="fas fa-user"></i> {p.profile?.full_name || 'ian'}
                                        </li>
                                        <li>
                                            <i className="fas fa-calendar"></i> {moment(p.date).format("DD MMM, YYYY")}
                                        </li>
                                        <li>
                                            <i className="fas fa-eye"></i> {p.view} Views
                                        </li>
                                    </ul>
                                </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                    
                    <div className="pagination">
                        <button 
                            className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                            onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        
                        {pageNumbers.map((number) => (
                            <button
                                key={number}
                                className={`page-item ${currentPage === number ? "active" : ""}`}
                                onClick={() => setCurrentPage(number)}
                            >
                                {number}
                            </button>
                        ))}
                        
                        <button 
                            className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
                            onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </section>

                <section className="categories-section">
                    <div className="section-header">
                        <h2>Categories</h2>
                    </div>
                    <div className="categories-grid">
                        {category?.map((c, index) => (
                            <Link to={`/category/${c.slug}/`} key={index} className="category-card">
                                <img src={c.image} alt={c.title} className="category-image" />
                                <h4>{c.title}</h4>
                                <small>{c.post_count} Articles</small>
                            </Link>
                        ))}
                    </div>
                </section>

            </div>
            <Footer />
        </div>
    );
}

export default Home;