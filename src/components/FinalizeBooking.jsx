import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegCalendarAlt, FaRegClock, FaUser, FaTimes } from "react-icons/fa";
import "../styles/FinalizeBooking.css";

const FinalizeBooking = () => {
  const navigate = useNavigate();

  const [selectedDate] = useState("14/02/2025");
  const [selectedTime] = useState("14:00");
  const [selectedPeople] = useState("4");

  const [timeLeft, setTimeLeft] = useState(300);
  const [bookingExpired, setBookingExpired] = useState(false);

  const [showLogin, setShowLogin] = useState(false);
  const [logoutStep, setLogoutStep] = useState("confirm");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [email, setEmail] = useState("");
  const [prefix, setPrefix] = useState("+44");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [flag, setFlag] = useState("🇬🇧");
  const [showFlagDropdown, setShowFlagDropdown] = useState(false);

  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCVC] = useState("");
  const [postcode, setPostcode] = useState("");

  const [occasion, setOccasion] = useState("");
  const [allergy, setAllergy] = useState("");

  useEffect(() => {
    if (timeLeft <= 0) {
      setBookingExpired(true);
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec.toString().padStart(2, "0")}`;
  };

  const handleEmailChange = (e) => setEmail(e.target.value);

  const handlePhoneChange = (e) => {
    let value = e.target.value;
    value = value.replace(/\D/g, "");
    value = value.slice(0, 10);
    if (value.length > 4) {
      value = value.slice(0, 4) + " " + value.slice(4);
    }
    setPhoneNumber(value);
  };

  const handleSelectFlag = (newFlag) => {
    const newPrefix = newFlag === "🇬🇧" ? "+44" : "+33";
    setFlag(newFlag);
    setPrefix(newPrefix);
    setShowFlagDropdown(false);
  };

  const handleCardNameChange = (e) => {
    if (/^[A-Za-z\s]*$/.test(e.target.value)) setCardName(e.target.value);
  };

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, "").slice(0, 16);
    setCardNumber(value.replace(/(.{4})/g, "$1 ").trim());
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, "").slice(0, 4);
    if (value.length >= 3) value = value.slice(0, 2) + "/" + value.slice(2);
    setExpiry(value);
  };

  const handleCVCChange = (e) => {
    setCVC(e.target.value.replace(/\D/g, "").slice(0, 4));
  };

  const handlePostcodeChange = (e) => {
    let value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "");
    if (value.length > 4) value = value.slice(0, 4) + " " + value.slice(4);
    setPostcode(value.slice(0, 8));
  };

  const isEmailValid = () => email.trim() !== "" && email.includes("@");
  const isPhoneValid = () => phoneNumber.replace(/\s/g, "").length === 10;
  const isCardNumberValid = () => /^\d{4} \d{4} \d{4} \d{4}$/.test(cardNumber);
  const isExpiryValid = () => /^\d{2}\/\d{2}$/.test(expiry);
  const isCvcValid = () => /^\d{3,4}$/.test(cvc);
  const isPostcodeValid = () => postcode.trim().length > 0;

  const isFormValid = () =>
    isEmailValid() &&
    isPhoneValid() &&
    cardName.trim() !== "" &&
    isCardNumberValid() &&
    isExpiryValid() &&
    isCvcValid() &&
    isPostcodeValid();

  const handleFinalize = () => {
    if (!isFormValid()) {
      alert("Please complete all required fields.");
      return;
    }
    navigate("/confirm");
  };

  return (
    <div className="finalize-booking-page">
      <div className="finalize-banner"></div>
      <h1 className="finalize-title">Ormer Mayfair, London</h1>

      <div className="selected-info">
        <div className="info-item">
          <FaRegCalendarAlt className="icon" />
          <span>{selectedDate}</span>
        </div>
        <div className="info-item">
          <FaRegClock className="icon" />
          <span>{selectedTime}</span>
        </div>
        <div className="info-item">
          <FaUser className="icon" />
          <span>{selectedPeople} people</span>
        </div>
      </div>

      <div className="holding-note">
        <p>
          We’re holding this table for you for{" "}
          <strong>{formatTime(timeLeft)}</strong>
        </p>
      </div>

      <div className="logout-line">
        Not Alex?{" "}
        <span className="logout-link" onClick={() => setShowLogin(true)}>
          Log out
        </span>
      </div>

      <div className="finalize-content">
        <div className="contact-info">
          <div className="finalize-field">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
            />
          </div>

          <div className="finalize-field">
            <label>Phone</label>
            <div className="phone-flag-container">
              <span
                className="flag-emoji"
                onClick={() => setShowFlagDropdown(!showFlagDropdown)}
              >
                {flag}
              </span>
              {showFlagDropdown && (
                <div className="flag-dropdown-list">
                  <div onClick={() => handleSelectFlag("🇬🇧")}>
                    🇬🇧 +44
                  </div>
                  <div onClick={() => handleSelectFlag("🇫🇷")}>
                    🇫🇷 +33
                  </div>
                </div>
              )}
              <span className="phone-prefix">{prefix}</span>
              <input
                type="text"
                value={phoneNumber}
                onChange={handlePhoneChange}
                placeholder="8415 244423"
              />
            </div>
          </div>
        </div>

        <div className="occasion-allergy">
          <div className="finalize-field">
            <label>Select an occasion (optional)</label>
            <select
              value={occasion}
              onChange={(e) => setOccasion(e.target.value)}
            >
              <option value="">Select an occasion</option>
              <option value="Birthday">Birthday</option>
              <option value="Anniversary">Anniversary</option>
              <option value="Business">Business dinner</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="finalize-field">
            <label>Allergy information (optional)</label>
            <input
              type="text"
              placeholder="e.g. Nut allergy"
              value={allergy}
              onChange={(e) => setAllergy(e.target.value)}
            />
          </div>
        </div>

        <div className="card-info-1">
          <div className="finalize-field">
            <label>Name on card</label>
            <input
              type="text"
              value={cardName}
              onChange={handleCardNameChange}
              placeholder="Name on card"
            />
          </div>
          <div className="finalize-field">
            <label>Card number</label>
            <input
              type="text"
              value={cardNumber}
              onChange={handleCardNumberChange}
              placeholder="0123 0123 0123 0123"
            />
          </div>
        </div>

        <div className="card-info-2">
          <div className="finalize-field finalize-expiry">
            <label>Expiry</label>
            <input
              type="text"
              value={expiry}
              onChange={handleExpiryChange}
              placeholder="MM/YY"
            />
          </div>
          <div className="finalize-field finalize-cvc">
            <label>CVC</label>
            <input
              type="password"
              value={cvc}
              onChange={handleCVCChange}
              placeholder="CVC"
            />
          </div>
          <div className="finalize-field finalize-postcode">
            <label>Postcode</label>
            <input
              type="text"
              value={postcode}
              onChange={handlePostcodeChange}
              placeholder="SE11 4RX"
            />
          </div>
        </div>

        <button
          className="finalize-button"
          onClick={handleFinalize}
          disabled={!isFormValid()}
        >
          Finalize booking
        </button>
      </div>

      {bookingExpired && (
        <div className="expired-modal-overlay">
          <div className="expired-modal">
            <h2>Booking has expired</h2>
            <p>
              Your booking time has expired. Please go back and select a new time.
            </p>
            <button
              className="expired-button"
              onClick={() => navigate("/booking")}
            >
              Select New Time
            </button>
          </div>
        </div>
      )}

      {showLogin && (
        <div className="logout-modal-overlay">
          <div className="logout-modal">
            <button
              className="close-logout-modal"
              onClick={() => {
                setShowLogin(false);
                setLogoutStep("confirm");
              }}
            >
              ×
            </button>
            {logoutStep === "confirm" ? (
              <>
                <h2 className="logout-modal-title">Switch Account</h2>
                <p className="logout-modal-message">
                  Are you sure you want to log out and sign in with a different account?
                </p>
                <button className="logout-submit" onClick={() => setLogoutStep("login")}>
                  Confirm Log Out
                </button>
              </>
            ) : (
              <>
                <h2 className="logout-modal-title">Log into Another Account</h2>
                <p className="logout-modal-message">
                  Please enter your credentials below.
                </p>
                <input
                  type="email"
                  className="logout-input"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="Email address"
                />
                <input
                  type="password"
                  className="logout-input"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Password"
                />
                <button
                  className="logout-submit"
                  onClick={() => {
                    setShowLogin(false);
                    setLogoutStep("confirm");
                  }}
                >
                  Log In
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FinalizeBooking;
