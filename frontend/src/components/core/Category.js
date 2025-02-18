import { useState, useEffect } from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import apiInstance from "../../utils/axios";
import "../../styles/category.css"; // Create this CSS file

function Category() {
    const [posts, setPosts] = useState([]);
    const param = useParams();

    const fetchPosts = async () => {
        const response = await apiInstance.get(`post/category/posts/${param.slug}/`);
        setPosts(response.data);
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    // Pagination
    const itemsPerPage = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const postItems = posts.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(posts.length / itemsPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
        <div className="category-container">
            <Header />
            
            <section className="category-header">
                <div className="header-content">
                    <img src="assets/images/adv-3.png" alt="Category header" className="header-image" />
                    <h2 className="category-title">
                        <i className="fas fa-th-large"></i> {posts[0]?.category?.title} ({posts.length} Articles)
                    </h2>
                </div>
            </section>

            <section className="posts-section">
                <div className="posts-grid">
                    {postItems?.map((p, index) => (
                        <div className="post-card" key={index}>
                            <div className="card-image-container">
                                <img className="card-image" src={p.image} alt={p.title} />
                            </div>
                            <div className="card-content">
                                <h3 className="card-title">
                                    <Link to={`${p.slug}`} className="card-link">
                                        {p.title?.slice(0, 32) + "..."}
                                    </Link>
                                </h3>
                                <ul className="post-meta">
                                    <li>
                                        <i className="fas fa-user"></i> {p?.profile?.full_name}
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
                        className={`pagination-button ${currentPage === 1 ? "disabled" : ""}`}
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    
                    {pageNumbers.map((number) => (
                        <button
                            key={number}
                            className={`pagination-button ${currentPage === number ? "active" : ""}`}
                            onClick={() => setCurrentPage(number)}
                        >
                            {number}
                        </button>
                    ))}
                    
                    <button 
                        className={`pagination-button ${currentPage === totalPages ? "disabled" : ""}`}
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default Category;