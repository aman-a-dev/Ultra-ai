import React from "react";
import "../css/Contact.css";
import Nav from "../components/Nav.jsx";
import Footer from "../components/Footer.jsx";

export default function Contact() {
    return (
        <>
            <Nav />
            <div className="contact-box ">
                <div className="bgblue">
                    <h1>About us</h1>
                    <div className="card">
                        <span class="colored">Welcome to Ultra AI</span> — your
                        all-in-one AI assistant hub powered by ChatGPT,
                        DeepSeek, and Gemini. We provide cutting-edge AI
                        services including AI chat for smart conversations and
                        AI image generation for stunning visuals. Whether you're
                        creating, learning, or exploring, Ultra AI Power
                        delivers fast, intelligent, and creative solutions with
                        the power of the world's top AI models.
                    </div>
                </div>
                <form className="form" id="form">
                    <h1>Message us</h1>
                    <input className="input" type="text" placeholder="Name" />
                    <input
                        className="input"
                        type="text"
                        placeholder="E-Mail I.D."
                    />
                    <textarea
                        className="textarea"
                        placeholder="Enter message"
                    ></textarea>
                    <center>
                        <button className="button">Submit</button>
                    </center>
                </form>
            </div>
            <Footer />
        </>
    );
}
