// src/components/Contact.jsx
import React, { useState } from "react";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  // ✅ Validate form
  const validate = () => {
    let tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = "Name is required";
    if (!formData.email.trim()) {
      tempErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      tempErrors.email = "Invalid email address";
    }
    if (!formData.message.trim()) tempErrors.message = "Message is required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // ✅ Update state on input change
  const handleChange = (e) => {
    const { name, value } = e.target; // destructuring for clarity
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("✅ Feedback submitted successfully!");
      setFormData({ name: "", email: "", message: "" });
      setErrors({});
    }
  };

  return (
    <div className="contact-container">
      <h2>📩 Contact Us</h2>
      <p>We’d love to hear your thoughts about <strong>My Weekly Habit Tracker</strong>!</p>

      <form onSubmit={handleSubmit} className="contact-form" noValidate>
        {/* Name */}
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        {/* Email */}
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        {/* Message */}
        <div className="form-group">
          <label htmlFor="message">Message / Feedback:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Write your feedback..."
          />
          {errors.message && <span className="error">{errors.message}</span>}
        </div>

        <button type="submit" className="submit-btn">
          Send Feedback
        </button>
      </form>
    </div>
  );
};

export default Contact;
