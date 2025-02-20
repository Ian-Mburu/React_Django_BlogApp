import React from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import "../../styles/contact.css"; // Import CSS file

function Contact() {
    return (
        <>
            <Header />
            <section className="contact-container">
                <h1>Contact Us</h1>
                <div className="map-container">
                    <iframe
                        title="Google Maps Location"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343008!2d-74.00425878428698!3d40.74076684379132!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259bf5c1654f3%3A0xc80f9cfce5383d5d!2sGoogle!5e0!3m2!1sen!2sin!4v1586000412513!5m2!1sen!2sin"
                        height="400"
                        aria-hidden="false"
                        tabIndex="0"
                        allowFullScreen=""
                    />
                </div>

                <div className="contact-info">
                    <div className="contact-box">
                        <h3>Address Information</h3>
                        <p>2492 Centennial NW, Acworth, GA, 30102</p>
                        <p>Call: <a href="tel:+1234567890">+123 4567 890 (Toll-free)</a></p>
                        <p>Email: <a href="mailto:desphixs@gmail.com">desphixs@gmail.com</a></p>
                        <p>Support Time: Mon-Sat, 9:30 AM - 6:00 PM</p>
                    </div>
                    <div className="contact-box">
                        <h3>Contact Information</h3>
                        <p>750 Sing Sing Rd, Horseheads, NY, 14845</p>
                        <p>Call: <a href="tel:+1234567890">+123 4567 890 (Toll-free)</a></p>
                        <p>Email: <a href="mailto:desphixs@gmail.com">desphixs@gmail.com</a></p>
                        <p>Support Time: Mon-Sat, 9:00 AM - 5:30 PM</p>
                    </div>
                </div>

                <h2>Send us a message</h2>
                <p>Please fill in the form below, and we will contact you soon.</p>

                <form className="contact-form" id="contact-form" name="contactform" method="POST">
                    <input required id="con-name" name="name" type="text" placeholder="Name" />
                    <input required id="con-email" name="email" type="email" placeholder="E-mail" />
                    <input required id="con-subject" name="subject" type="text" placeholder="Subject" />
                    <textarea required id="con-message" name="message" rows="6" placeholder="Message"></textarea>
                    <button type="submit">Send Message</button>
                </form>
            </section>
            <Footer />
        </>
    );
}

export default Contact;
