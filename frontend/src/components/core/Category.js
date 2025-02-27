import React from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import { Link } from "react-router-dom";
import "../../styles/category.css"; 

function Category() {
    return (
        <div className="category-page">
            <Header />
            <section className="category-header">
                <div className="header-container">
                    <a href="#" className="header-image">
                        <img src="assets/images/adv-3.png" alt="Advertisement" />
                    </a>
                    <h2 className="header-title">
                        <i className="bi bi-grid-fill"></i> LifeStyle (16 Articles)
                    </h2>
                </div>
            </section>

            <section className="category-posts">
                <div className="posts-container">
                    <div className="posts-grid">
                        {Array.from({ length: 16 }).map((_, index) => (
                            <div className="post-card" key={index}>
                                <div className="post-image">
                                    <img
                                        src="https://awcdn1.ahmad.works/writing/wp-content/uploads/2015/05/cheerful-loving-couple-bakers-drinking-coffee-PCAVA6B-2.jpg"
                                        alt="Post"
                                        style={{ width: "100%", height: "160px", objectFit: "cover" }}
                                    />
                                </div>
                                <div className="post-content">
                                    <h4 className="post-title">
                                        <Link to="/post-single" className="post-link">
                                            7 common mistakes everyone makes while traveling
                                        </Link>
                                    </h4>
                                    <ul className="post-meta">
                                        <li>
                                            <Link to="#" className="meta-link">
                                                <i className="fas fa-user"></i> Louis Ferguson
                                            </Link>
                                        </li>
                                        <li>
                                            <i className="fas fa-calendar"></i> Mar 07, 2022
                                        </li>
                                        <li>
                                            <i className="fas fa-eye"></i> 10 Views
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>

                    <nav className="pagination">
                        <button className="pagination-button">
                            <i className="fas fa-arrow-left"></i> Previous
                        </button>
                        <div className="pagination-pages">
                            <button className="pagination-page active">1</button>
                            <button className="pagination-page">2</button>
                        </div>
                        <button className="pagination-button">
                            Next <i className="fas fa-arrow-right"></i>
                        </button>
                    </nav>
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default Category;