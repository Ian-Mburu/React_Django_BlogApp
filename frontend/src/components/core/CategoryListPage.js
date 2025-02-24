// CategoryListPage.js
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apiInstance from '../../utils/axios';

function CategoryListPage() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apiInstance.get('category/');
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="category-list">
      <h1>All Categories</h1>
      <div className="categories-grid">
        {categories.map((post) => (
          <Link 
            key={post.id}
            to={`/detail/${post.slug}`}
            className="category-card"
          >
            <h3>{post.title}</h3>
            <p>{post.post_count} Article</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CategoryListPage;