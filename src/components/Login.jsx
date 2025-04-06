import React, { useState } from "react";
import "../styles/style.css"; 
import img1 from "../assets/img1.jpeg";
import img2 from "../assets/img2.jpeg";
import img3 from "../assets/img3.jpeg";
import img4 from "../assets/img4.jpeg";

function Login() {
  const [showModal, setShowModal] = useState(false);
  const [showCodeStep, setShowCodeStep] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [maskedEmail, setMaskedEmail] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    alert("Login clicked — backend coming soon 👀");
  };

  const handleOpenModal = (e) => {
    e.preventDefault();
    setShowModal(true);
    setShowCodeStep(false);
    setResetEmail("");
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSendCode = () => {
    if (resetEmail.trim() === "") {
      alert("Please enter your email.");
      return;
    }

    const masked = maskEmail(resetEmail);
    setMaskedEmail(masked);
    setShowCodeStep(true);
  };

  const maskEmail = (email) => {
    const [user, domain] = email.split("@");
    const visible = user[0];
    const maskedPart = "*".repeat(Math.max(user.length - 2, 4));
    return `${visible}${maskedPart}@${domain}`;
  };

  return (
    <div className="container">
      <header className="hero">
        <h1>
          Join us for an exquisite dining experience <br />
          and reserve your spot at Ormer Mayfair
        </h1>
      </header>

      <section className="image-row">
        <img src={img1} alt="Restaurant 1" />
        <img src={img2} alt="Restaurant 2" />
        <img src={img3} alt="Restaurant 3" />
        <img src={img4} alt="Restaurant 4" />
      </section>

      <section className="login-form">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" placeholder="Enter your email" />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" placeholder="Enter your password" />

        <div className="login-options">
          <label className="remember">
            <input type="checkbox" id="remember" />
            Remember me
          </label>
          <a href="#" className="forgot" onClick={handleOpenModal}>
            Forgot password?
          </a>
        </div>

        <button className="login-btn" onClick={handleLogin}>Login</button>

        <p className="register-link">
          Don’t have an account? <a href="/register">Register</a>
        </p>
      </section>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" style={{ display: "flex" }}>
          <div className="modal">
            <button className="close-modal" onClick={handleCloseModal}>
              ×
            </button>

            {!showCodeStep ? (
              <div id="emailStep">
                <h5 className="modal-subtitle">Security</h5>
                <h2 className="modal-title">Reset your password</h2>
                <p className="modal-text">
                  Enter your email and we’ll send you a reset code.
                </p>

                <input
                  type="email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  placeholder="Email address"
                  className="modal-input"
                />

                <button className="modal-btn" onClick={handleSendCode}>
                  Send Code
                </button>
              </div>
            ) : (
              <div id="codeStep">
                <h5 className="modal-subtitle">Security</h5>
                <h2 className="modal-title">Check your email</h2>
                <p className="modal-text">
                  Enter the code we sent to{" "}
                  <span className="blurred-email">{maskedEmail}</span>
                </p>

                <input
                  type="text"
                  placeholder="Code"
                  className="modal-input"
                />

                <a href="#" className="new-code-link">
                  Get a new code
                </a>

                <button className="modal-btn">Continue</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
