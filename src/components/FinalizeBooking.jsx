import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegCalendarAlt, FaRegClock, FaUser } from "react-icons/fa";
import "../styles/FinalizeBooking.css";

const FinalizeBooking = () => {
  const navigate = useNavigate();

  // Mocked booking details
  const [selectedDate] = useState("14/02/2025");
  const [selectedTime] = useState("14:00");
  const [selectedPeople] = useState("4");

  // Timer logic
  const [timeLeft, setTimeLeft] = useState(300);
  const [bookingExpired, setBookingExpired] = useState(false);

  // Show/hide login modal
  const [showLogin, setShowLogin] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Required fields
  const [email, setEmail] = useState("");
  // Single phone state including prefix, e.g. "+44 1234567890"
  const [phone, setPhone] = useState("+44 ");
  // Whether the small country-flag dropdown is open
  const [showFlagDropdown, setShowFlagDropdown] = useState(false);

  // Payment fields
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCVC] = useState("");
  const [postcode, setPostcode] = useState("");

  // Optional fields
  // (occasion and allergy are optional, so we don’t include them in validation)
  const [occasion, setOccasion] = useState("");
  const [allergy, setAllergy] = useState("");

  // Countdown effect
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

  /*************************
   *    FIELD HANDLERS     *
   *************************/
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePhoneChange = (e) => {
    let value = e.target.value;

    // Enforce either +44 or +33 prefix at the start
    if (value.startsWith("+44 ")) {
      // Strip prefix, keep only digits
      let digits = value.replace("+44 ", "").replace(/\D/g, "");
      // Limit digits to 10
      if (digits.length > 10) digits = digits.slice(0, 10);
      setPhone(`+44 ${digits}`);
    } else if (value.startsWith("+33 ")) {
      let digits = value.replace("+33 ", "").replace(/\D/g, "");
      if (digits.length > 10) digits = digits.slice(0, 10);
      setPhone(`+33 ${digits}`);
    } else {
      // If user manually deleted the prefix, default to +44
      let digits = value.replace(/\D/g, "").slice(0, 10);
      setPhone(`+44 ${digits}`);
    }
  };

  // Switch prefix from the dropdown
  const handleSelectPrefix = (prefix) => {
    // Remove old prefix and reapply the new one with existing digits
    let current = phone;
    if (current.startsWith("+44 ")) {
      current = current.replace("+44 ", "");
    } else if (current.startsWith("+33 ")) {
      current = current.replace("+33 ", "");
    }
    // Only digits remain
    let digits = current.replace(/\D/g, "").slice(0, 10);
    setPhone(`${prefix} ${digits}`);
    setShowFlagDropdown(false);
  };

  const handleCardNameChange = (e) => {
    const value = e.target.value;
    // Only letters and spaces
    if (/^[A-Za-z\s]*$/.test(value)) {
      setCardName(value);
    }
  };

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, "").slice(0, 16);
    // Insert spaces every 4 digits
    value = value.replace(/(.{4})/g, "$1 ").trim();
    setCardNumber(value);
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, "").slice(0, 4);
    if (value.length >= 3) {
      value = value.slice(0, 2) + "/" + value.slice(2);
    }
    setExpiry(value);
  };

  const handleCVCChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 4);
    setCVC(value);
  };

  const handlePostcodeChange = (e) => {
    let value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "");
    if (value.length > 4) {
      value = value.slice(0, 4) + " " + value.slice(4);
    }
    setPostcode(value.slice(0, 8));
  };

  /*************************
   *    FORM VALIDATION    *
   *************************/
  const isEmailValid = () => {
    // Simple check: must contain "@" 
    return email.trim() !== "" && email.includes("@");
  };

  const isPhoneValid = () => {
    // Must start with +44 or +33, then have exactly 10 digits
    if (phone.startsWith("+44 ")) {
      const digits = phone.replace("+44 ", "");
      return digits.length === 10 && /^\d+$/.test(digits);
    } else if (phone.startsWith("+33 ")) {
      const digits = phone.replace("+33 ", "");
      return digits.length === 10 && /^\d+$/.test(digits);
    }
    return false;
  };

  const isCardNumberValid = () => {
    // After removing spaces, must have 16 digits
    const raw = cardNumber.replace(/\s+/g, "");
    return raw.length === 16 && /^\d+$/.test(raw);
  };

  const isExpiryValid = () => {
    // Very simplistic check: must be 5 characters "MM/YY"
    return expiry.length === 5 && /^\d{2}\/\d{2}$/.test(expiry);
  };

  const isCvcValid = () => {
    // 3 or 4 digits
    return cvc.length >= 3 && cvc.length <= 4 && /^\d+$/.test(cvc);
  };

  const isPostcodeValid = () => {
    // Just check if not empty for now, or length > 0
    return postcode.trim() !== "";
  };

  const isFormValid = () => {
    return (
      isEmailValid() &&
      isPhoneValid() &&
      cardName.trim() !== "" &&
      isCardNumberValid() &&
      isExpiryValid() &&
      isCvcValid() &&
      isPostcodeValid()
    );
  };

  // Finalize booking only if valid
  const handleFinalize = () => {
    if (!isFormValid()) {
      alert("Please fill all required fields correctly before finalizing.");
      return;
    }
    // If valid, proceed
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
        Not Alex? <span className="logout-link" onClick={() => setShowLogin(true)}>Log out</span>
      </div>

      <div className="finalize-content">
        {/* CONTACT INFO */}
        <div className="contact-info">
          <div className="finalize-field">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>

          <div className="finalize-field">
            <label>Phone</label>
            <div
              className="phone-single-input"
              onClick={() => setShowFlagDropdown(!showFlagDropdown)}
            >
              <input
                type="text"
                value={phone}
                onChange={handlePhoneChange}
              />
              <span className="dropdown-arrow">▾</span>
              {showFlagDropdown && (
                <ul className="flag-dropdown">
                  <li onClick={() => handleSelectPrefix("+44")}>🇬🇧 +44</li>
                  <li onClick={() => handleSelectPrefix("+33")}>🇫🇷 +33</li>
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* OCCASION + ALLERGY (OPTIONAL) */}
        <div className="occasion-allergy">
          <div className="finalize-field">
            <label>Select an occasion (optional)</label>
            <select value={occasion} onChange={(e) => setOccasion(e.target.value)}>
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

        {/* CARD INFO */}
        <div className="card-info-1">
          <div className="finalize-field">
            <label>Name on card</label>
            <input
              type="text"
              placeholder="Name on card"
              value={cardName}
              onChange={handleCardNameChange}
            />
          </div>
          <div className="finalize-field">
            <label>Card number</label>
            <input
              type="text"
              placeholder="0123 0123 0123 0123"
              value={cardNumber}
              onChange={handleCardNumberChange}
            />
          </div>
        </div>

        <div className="card-info-2">
          <div className="finalize-field finalize-expiry">
            <label>Expiry</label>
            <input
              type="text"
              placeholder="01/25"
              value={expiry}
              onChange={handleExpiryChange}
            />
          </div>
          <div className="finalize-field finalize-cvc">
            <label>CVC</label>
            <input
              type="password"
              placeholder="CVC"
              value={cvc}
              onChange={handleCVCChange}
            />
          </div>
          <div className="finalize-field finalize-postcode">
            <label>Postcode</label>
            <input
              type="text"
              placeholder="SE11 4RX"
              value={postcode}
              onChange={handlePostcodeChange}
            />
          </div>
        </div>

        {/* FINALIZE BUTTON: DISABLED unless form is valid */}
        <button
          className="finalize-button"
          onClick={handleFinalize}
          disabled={!isFormValid()}
        >
          Finalize booking
        </button>
      </div>

      {/* EXPIRED MODAL */}
      {bookingExpired && (
        <div className="expired-modal-overlay">
          <div className="expired-modal">
            <h2>Booking has expired</h2>
            <p>Your booking time has expired. Please go back and select a new time.</p>
            <button
              className="expired-button"
              onClick={() => navigate("/booking")}
            >
              Select New Time
            </button>
          </div>
        </div>
      )}

      {/* LOGIN MODAL */}
      {showLogin && (
        <div className="login-modal-overlay">
          <div className="login-modal">
            <button className="close-button" onClick={() => setShowLogin(false)}>
              ×
            </button>
            <h2>Log in</h2>
            <input
              type="email"
              placeholder="Enter your email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Enter your password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
            <button className="login-button" onClick={() => setShowLogin(false)}>
              Log in
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinalizeBooking;
