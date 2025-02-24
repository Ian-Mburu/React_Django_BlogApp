import { useState, useEffect } from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import { Link } from "react-router-dom";
import apiInstance from "../../utils/axios";
import useUserData from "../../Plugin/useUserData";
import moment from "moment";
import Toast from "../../Plugin/Toast";
import "../../styles/dashboard/dashboard.css";

function Dashboard() {
  const [stats, setStats] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [noti, setNoti] = useState([]);

  const userId = useUserData()?.user_id;

  const fetchDashboardData = async () => {
      const stats_res = await apiInstance.get(`author/dashboard/stats/${userId}/`);
      setStats(stats_res.data[0]);

      const post_res = await apiInstance.get(`author/dashboard/post-list/${userId}/`);
      setPosts(post_res.data);

      const comment_res = await apiInstance.get(`author/dashboard/comment-list/`);
      setComments(comment_res.data);

      const noti_res = await apiInstance.get(`author/dashboard/noti-list/${userId}/`);
      setNoti(noti_res.data);
  };

  useEffect(() => {
      fetchDashboardData();
  }, []);

  const handleMarkNotiAsSeen = async (notiId) => {
      const response = await apiInstance.post("author/dashboard/noti-mark-seen/", { noti_id: notiId });
      console.log(response.data);
      fetchDashboardData();
      Toast("success", "Notification Seen", "");
  };

    return (
        <>
            <Header />
            <section className="dashboard-container">
                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-icon success"><i className="bi bi-people-fill" /></div>
                        <div className="stat-info">
                            <h3>{stats.views}</h3>
                            <h6>Total Views</h6>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon primary"><i className="bi bi-file-earmark-text-fill" /></div>
                        <div className="stat-info">
                            <h3>{stats.posts}</h3>
                            <h6>Posts</h6>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon danger"><i className="bi bi-suit-heart-fill" /></div>
                        <div className="stat-info">
                            <h3>{stats.likes}</h3>
                            <h6>Likes</h6>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon info"><i className="bi bi-tag" /></div>
                        <div className="stat-info">
                            <h3>{stats.bookmarks}</h3>
                            <h6>Bookmarks</h6>
                        </div>
                    </div>
                </div>

                <div className="dashboard-content">
                    <div className="dashboard-section">
                        <h5>All Posts ({stats.posts})</h5>
                        <div className="post-list">
                            {posts?.map((p, index) => (
                                <div key={index} className="post-item">
                                    <img src={p.image} alt="product" className="post-image" />
                                    <div className="post-info">
                                        <Link to={`/post/${p.id}`} className="post-title">{p.title}</Link>
                                        <p>{moment(p.date).format("DD MMM, YYYY")}</p>
                                        <p>{p.view} Views</p>
                                        <p>{p.likes?.length} Likes</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Link to="/posts/" className="view-all">View all Posts</Link>
                    </div>

                    <div className="dashboard-section">
                        <h5>Comments ({comments?.length})</h5>
                        <div className="comment-list">
                            {comments?.slice(0, 3).map((c, index) => (
                                <div key={index} className="comment-item">
                                    <img src="https://as1.ftcdn.net/v2/jpg/03/53/11/00/1000_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg" alt="avatar" className="comment-avatar" />
                                    <div className="comment-info">
                                        <p>{c.comment}</p>
                                        <p>by {c.name} | {moment(c.date).format("DD MMM, YYYY")}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Link to="/comments/" className="view-all">View all Comments</Link>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default Dashboard;
