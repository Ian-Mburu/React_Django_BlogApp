// PostDetail.js
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import apiInstance from '../../utils/axios';

function PostDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await apiInstance.get(`post/detail/${slug}/`);
        setPost(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="post-detail">
      <h1>{post.title}</h1>
      <div>{post.description}</div>
    </div>
  );
}

export default PostDetail;