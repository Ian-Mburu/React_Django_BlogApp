import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import apiInstance from "../../utils/axios";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import "../../styles/category.css";

function Category() {
    const [posts, setPosts] = useState([]);
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { slug } = useParams();
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const [categoryRes, postsRes] = await Promise.all([
            apiInstance.get(`category/${slug}/`),
            apiInstance.get(`post/category/posts/${slug}/`)
          ]);
          
          if (!categoryRes.data.length || !postsRes.data.length) {
            throw new Error('Category not found');
          }
  
          setCategory(categoryRes.data[0]);
          setPosts(postsRes.data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, [slug]);


    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    return (
        <div className="category-container">
            <Header />
            
            <section className="category-header">
                <div className="header-content">
                    {category?.image && (
                        <img 
                            src={category.image} 
                            alt={category.title} 
                            className="header-image"
                        />
                    )}
                    <h2 className="category-title">
                        <i className="fas fa-th-large"></i> 
                        {category?.title} ({posts.length} Articles)
                    </h2>
                </div>
            </section>

            <section className="posts-section">
                <div className="posts-grid">
                    {posts.map((post) => (
                        <div className="post-card" key={post.id}>
                            <div className="card-image-container">
                                <img 
                                    src={post.image} 
                                    alt={post.title} 
                                    className="card-image"
                                />
                            </div>
                            <div className="card-content">
                                <h3 className="card-title">
                                    <Link to={`/post/${post.slug}`} className="card-link">
                                        {post.title}
                                    </Link>
                                </h3>
                                <div className="post-meta">
                                    <span>
                                        <i className="fas fa-user"></i> {post.user?.full_name}
                                    </span>
                                    <span>
                                        <i className="fas fa-calendar"></i> 
                                        {moment(post.date).format("MMM DD, YYYY")}
                                    </span>
                                    <span>
                                        <i className="fas fa-eye"></i> {post.view} Views
                                    </span>
                                </div>
                                <div className="post-stats">
                                    <span>
                                        <i className="fas fa-heart"></i> {post.likes_count}
                                    </span>
                                    <span>
                                        <i className="fas fa-comment"></i> {post.comments_count}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default Category;