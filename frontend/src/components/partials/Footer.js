import React from "react";
import "../../styles/footer.css"; // Ensure you create this CSS file

function Footer() {
    return (
        <footer className="footer-container">
            <div className="footer-content">
                <div className="footer-text">
                    <span>2019 - 2024</span>
                    <a href="https://youtube.com/@desphixs/" className="footer-link" target="_blank" rel="noopener noreferrer">
                        Desphixs
                    </a>
                    | All rights reserved
                </div>
                <div className="footer-logo">
                    <img src="/logo.png" alt="footer logo" />
                </div>
                <div className="footer-social">
                    <a href="https://facebook.com/desphixs" className="social-icon">
                        <i className="fab fa-facebook-square" />
                    </a>
                    <a href="https://twitter.com/desphixs" className="social-icon">
                        <i className="fab fa-twitter-square" />
                    </a>
                    <a href="https://youtube.com/@desphixs" className="social-icon">
                        <i className="fab fa-youtube-square" />
                    </a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
