import { useState, useEffect } from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import { Link } from "react-router-dom";
import moment from "moment";
import apiInstance from "../../utils/axios";
import useUserData from "../../Plugin/useUserData";
import Toast from "../../Plugin/Toast";
import "../../styles/home.css";

function Home() {
    const [posts, setPosts] = useState([]);
    const userData = useUserData();
    const [popularPosts, setPopularPosts] = useState([]);
    const [category, setCategory] = useState([]);

    const fetchPosts = async () => {
        const response = await apiInstance.get(`post/lists/`);
        setPosts(response.data);
    };

    const fetchPopularPost = () => {
        const sortedPopularPost = posts?.sort((a, b) => b.view - a.view);
        setPopularPosts(sortedPopularPost);
    };

    const fetchCategory = async () => {
        const response = await apiInstance.get(`post/category/list/`);
        setCategory(response.data);
    };

    useEffect(() => {
        fetchPosts();
        fetchCategory();
    }, []);

    useEffect(() => {
        fetchPopularPost();
    }, [posts]);

    // Pagination
    const itemsPerPage = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const postItems = posts.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(posts.length / itemsPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    const handleLikePost = async (postId) => {
        const jsonData = {
            user_id: userData?.user_id,
            post_id: postId,
        };
        const response = await apiInstance.post(`post/like-post/`, jsonData);
        console.log(response.data);
        fetchPosts();

        Toast("success", response.data.message, "");
    };

    const handleBookmarkPost = async (postId) => {
        const jsonData = {
            user_id: userData?.user_id,
            post_id: postId,
        };
        const response = await apiInstance.post(`post/bookmark-post/`, jsonData);
        console.log(response.data);
        fetchPosts();

        Toast("success", response.data.message, "");
    };

    return (
        <div>
            <Header />
            <div className="home-container">
                
                <section>
                    <div className="grid-container">
                        {postItems?.map((p, index) => (
                            <div className="grid-card" key={index}>
                                <div className="card-image-container">
                                    <img className="card-image" src={p.image} alt={p.title} />
                                </div>
                                <div className="card-content">
                                    <h3 className="card-title">
                                        <Link to={`${p.slug}`} className="card-link">
                                            {p.title?.slice(0, 32) + "..."}
                                        </Link>
                                    </h3>
                                    <div className="card-actions">
                                        <button type="button" onClick={() => handleBookmarkPost(p.id)} className="icon-btn">
                                            <i className="fas fa-bookmark"></i>
                                        </button>
                                        <button onClick={() => handleLikePost(p.id)} className="icon-btn">
                                            <i className="fas fa-thumbs-up"></i>
                                        </button>
                                        <span className="like-count">{p.likes?.length}</span>
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

                <section className="section-header">
                    <h2>Popular Articles 🕒</h2>
                    <img src="assets/images/adv-3.png" alt="Popular articles" className="header-image" />
                </section>

                <div className="grid-container">
                    {popularPosts?.map((p, index) => (
                        <div className="grid-card" key={index}>
                            {/* Popular posts card content same as trending posts */}
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Home;