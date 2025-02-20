import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import Header from "../partials/Header";
import Footer from "../partials/Footer";
import apiInstance from "../../utils/axios";
import useUserData from "../../Plugin/useUserData";
import '../../styles/dashboard/post.css'

function Posts() {
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const userId = useUserData()?.user_id;

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await apiInstance.get(`author/dashboard/post-list/${userId}/`);
                setPosts(response.data);
                setFilteredPosts(response.data);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };
        
        if (userId) fetchPosts();
    }, [userId]);

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        if (query === "") {
            setFilteredPosts(posts);
        } else {
            const filtered = posts.filter((post) => post.title.toLowerCase().includes(query));
            setFilteredPosts(filtered);
        }
    };

    const handleSortChange = (e) => {
        const sortValue = e.target.value;
        let sortedPosts = [...filteredPosts];

        if (sortValue === "Newest") {
            sortedPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
        } else if (sortValue === "Oldest") {
            sortedPosts.sort((a, b) => new Date(a.date) - new Date(b.date));
        } else if (["Active", "Draft", "Disabled"].includes(sortValue)) {
            sortedPosts = posts.filter((post) => post.status === sortValue);
        } else {
            setFilteredPosts(posts);
            return;
        }

        setFilteredPosts(sortedPosts);
    };

    return (
        <>
            <Header />
            <section className="py-4">
                <div className="container">
                    <div className="row g-4">
                        <div className="col-12">
                            <div className="card border bg-transparent rounded-3">
                                <div className="card-header bg-transparent border-bottom p-3 d-sm-flex justify-content-between align-items-center">
                                    <h5 className="mb-2 mb-sm-0">
                                        All Blog Posts <span className="badge bg-primary bg-opacity-10 text-primary">{filteredPosts.length}</span>
                                    </h5>
                                    <button className="btn btn-sm btn-primary">Add New <i className="fas fa-plus"></i></button>
                                </div>
                                <div className="card-body">
                                    <div className="row g-3 align-items-center justify-content-between mb-3">
                                        <div className="col-md-8">
                                            <input onChange={handleSearch} className="form-control" type="search" placeholder="Search Articles" />
                                        </div>
                                        <div className="col-md-3">
                                            <select onChange={handleSortChange} className="form-select">
                                                <option value="">Sort by</option>
                                                <option value="Newest">Newest</option>
                                                <option value="Oldest">Oldest</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="table-responsive border-0">
                                        <table className="table table-hover">
                                            <thead className="table-dark">
                                                <tr>
                                                    <th>Image</th>
                                                    <th>Article Name</th>
                                                    <th>Views</th>
                                                    <th>Published Date</th>
                                                    <th>Category</th>
                                                    <th>Status</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {filteredPosts.map((p) => (
                                                    <tr key={p.id}>
                                                        <td>
                                                            <Link to={`/detail/${p.slug}/`}>
                                                                <img src={p.image} alt="" style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "10px" }} />
                                                            </Link>
                                                        </td>
                                                        <td>
                                                            <Link to={`/detail/${p.slug}/`} className="text-dark text-decoration-none">{p.title}</Link>
                                                        </td>
                                                        <td>{p.view} Views</td>
                                                        <td>{moment(p.date).format("DD MMM, YYYY")}</td>
                                                        <td>{p.category?.title}</td>
                                                        <td>
                                                            <span className="badge bg-dark text-dark">{p.status}</span>
                                                        </td>
                                                        <td>
                                                            <div className="d-flex gap-2">
                                                                <Link to={`/edit-post/${p.id}/`} className="btn btn-primary btn-sm" title="Edit">
                                                                    <i className="bi bi-pencil-square" />
                                                                </Link>
                                                                <button className="btn btn-danger btn-sm" title="Delete">
                                                                    <i className="bi bi-trash" />
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default Posts;