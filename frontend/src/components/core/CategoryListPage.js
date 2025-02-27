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
                        {categories?.map((c, index) => (
                            <Link to={`/detail/${c.slug}/`} key={index} className="category-card">
                                <img src={c.image} alt={c.title} className="category-image" />
                                <h4>{c.title}</h4>
                                <small>{c.post_count} Articles</small>
                            </Link>
                        ))}
                    </div>
    </div>
  );
}

export default CategoryListPage;