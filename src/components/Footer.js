import React from "react";
import footerImage from './foot.jpg';
import './Footer.css';

export default function Footer() {
    return (
        <div className="footer">
            <div className="img-container">
                <img className="image object-cover" src={footerImage} alt="Footer image" />
            </div>

            <div className="contact">
                <div className="headings">
                    <h2>contact us</h2>
                    <h3>Every habit counts. Stay committed to your journey</h3>
                </div>
                <div className="connection">
                    <div className="left">
                    <p>We’re here to support your habit-tracking journey! Whether you have questions, feedback, or just want to share your progress, reach out—we’d love to hear from you. Your input helps us improve and create a better experience for everyone. Let’s build better habits, together!</p>
                    </div>
                    <div className="right">
                        <lable>Name: </lable>
                        <input type="text" placeholder = "enter your name"></input><br></br>
                        <lable>Email: </lable>
                        <input type = "email" placeholder="enter you email"></input><br></br>
                        <lable>Message: </lable>
                        <textarea type="text"></textarea><br></br>
                        <button>contact</button>
                    </div>
                </div>
            </div>
        </div>
    )
}