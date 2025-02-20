// static/js/category.js
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const categoryGrid = document.getElementById('categoryGrid');
    const postGrid = document.getElementById('postGrid');
    const categoryTitle = document.getElementById('categoryTitle');
    const loadingSpinner = document.getElementById('loadingSpinner');

    // State
    let isFetching = false;

    // Helper functions
    const showLoading = () => {
        if (loadingSpinner) loadingSpinner.style.display = 'block';
    };

    const hideLoading = () => {
        if (loadingSpinner) loadingSpinner.style.display = 'none';
    };

    const handleImageError = (imgElement) => {
        imgElement.onerror = null;
        imgElement.parentElement.innerHTML = '<div class="image-placeholder">No Image</div>';
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    // Category functions
    const fetchCategories = async () => {
        try {
            showLoading();
            const response = await fetch('/api/categories/');
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            renderCategories(data.categories);
        } catch (error) {
            console.error('Error fetching categories:', error);
            categoryGrid.innerHTML = `
                <p class="error">
                    Failed to load categories. 
                    <button onclick="location.reload()">Retry</button>
                </p>
            `;
        } finally {
            hideLoading();
        }
    };

    const renderCategories = (categories) => {
        if (categories.length === 0) {
            categoryGrid.innerHTML = '<p class="empty-state">No categories found</p>';
            return;
        }

        categoryGrid.innerHTML = categories.map(category => `
            <article class="category-card" aria-label="${category.title}">
                <figure class="category-image-container">
                    ${category.image ? 
                        `<img src="${category.image}" 
                              alt="${category.title}" 
                              class="category-image"
                              onerror="handleImageError(this)">` : 
                        '<div class="image-placeholder">No Image</div>'}
                </figure>
                <div class="category-info">
                    <h2 class="category-title">${category.title}</h2>
                    <p class="post-count">${category.post_count} Posts</p>
                    <button class="view-posts" 
                            data-slug="${category.slug}"
                            aria-label="View posts in ${category.title}">
                        Explore
                    </button>
                </div>
            </article>
        `).join('');

        // Event delegation for category buttons
        categoryGrid.addEventListener('click', (e) => {
            if (e.target.classList.contains('view-posts')) {
                const slug = e.target.dataset.slug;
                window.location.href = `/category/${slug}/`;
            }
        });
    };

    // Post functions
    const fetchCategoryPosts = async () => {
        try {
            showLoading();
            const slug = window.location.pathname.split('/')[2];
            if (!slug) return;

            const response = await fetch(`/api/category/${slug}/`);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            
            renderCategoryHeader(data.category);
            renderPosts(data.posts);
        } catch (error) {
            console.error('Error fetching posts:', error);
            postGrid.innerHTML = `
                <p class="error">
                    Failed to load posts. 
                    <button onclick="location.reload()">Retry</button>
                </p>
            `;
        } finally {
            hideLoading();
        }
    };

    const renderCategoryHeader = (category) => {
        if (categoryTitle) {
            categoryTitle.innerHTML = `
                <h1 class="category-heading">${category.title}</h1>
                <p class="post-count">${category.post_count} Posts Available</p>
            `;
        }
    };

    const renderPosts = (posts) => {
        if (posts.length === 0) {
            postGrid.innerHTML = '<p class="empty-state">No posts found in this category</p>';
            return;
        }

        postGrid.innerHTML = posts.map(post => `
            <article class="post-card" aria-label="${post.title}">
                <figure class="post-image-container">
                    ${post.image ? 
                        `<img src="${post.image}" 
                              alt="${post.title}" 
                              class="post-image"
                              onerror="handleImageError(this)">` : 
                        '<div class="image-placeholder">No Image</div>'}
                </figure>
                <div class="post-content">
                    <h3 class="post-title">${post.title}</h3>
                    <div class="post-meta">
                        <span class="author">${post.user.username}</span>
                        <time class="date" datetime="${post.date}">
                            ${formatDate(post.date)}
                        </time>
                    </div>
                    <a href="/post/${post.slug}/" 
                       class="read-more"
                       aria-label="Read more about ${post.title}">
                        Read More
                    </a>
                </div>
            </article>
        `).join('');
    };

    // Initialize
    const init = () => {
        if (categoryGrid) fetchCategories();
        if (postGrid) fetchCategoryPosts();
    };

    // Start the application
    init();
});

// Expose utility functions to global scope for image error handling
window.handleImageError = (imgElement) => {
    imgElement.onerror = null;
    imgElement.parentElement.innerHTML = '<div class="image-placeholder">No Image</div>';
};