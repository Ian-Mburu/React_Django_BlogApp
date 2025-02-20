import React from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import "../../styles/about.css"; // Import CSS file

function About() {
    return (
        <>
            <Header />
            <section className="about-container">
                <h2>Our Story</h2>
                <p>Lorem ipsum dolor sit amet...</p>

                <h3>Our Team</h3>
                <div className="team-container">
                    <div className="team-member">
                        <img src="https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZmFjZXxlbnwwfHwwfHx8MA%3D%3D" alt="Louis Ferguson" />
                        <h5>Louis Ferguson</h5>
                        <p>Editor in Chief</p>
                    </div>
                    {/* Repeat team members */}
                </div>

                <h3>What We Do</h3>
                <div className="services-container">
                    <div className="service-item">
                        <img src="https://www.aspistrategist.org.au/wp-content/uploads/2023/11/GettyImages-467714941-1024x764.jpg" alt="Global news services" />
                        <h4>Global news services</h4>
                        <p>Perceived end knowledge...</p>
                    </div>
                    {/* Repeat service items */}
                </div>
            </section>
            <Footer />
        </>
    );
}

export default About;
