import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaCommentDots,
  FaMoneyBillWave,
  FaUtensils,
  FaChartLine,
  FaRegCalendarAlt,
  FaRegClock,
  FaUser,
  FaBell,
  FaTimes
} from "react-icons/fa";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import banner from "../assets/banner.jpeg";
import spicysalad from "../assets/spicysalad.jpeg";
import bookingphoto1 from "../assets/bookingphoto1.jpg";
import bookingphoto2 from "../assets/bookingphoto2.jpg";
import bookingphoto3 from "../assets/bookingphoto3.jpg";
import germancake from "../assets/germancake.jpeg";
import sourdough from "../assets/sourdough.jpeg";
import searedHalibut from "../assets/searedhalibut.jpg";
import crispyDuckConfit from "../assets/crispyduckconfit.jpg";
import vanillaPannaCotta from "../assets/vanillapanndacotta.jpg";
import truffleMushroomRisotto from "../assets/trufflemushroomrisotto.jpg";

import "../styles/Booking.css";

const Booking = () => {
  const navigate = useNavigate();

  
  const [activeTab, setActiveTab] = useState("Overview");
  const [selectedDate, setSelectedDate] = useState(null);
  const [dropdownTime, setDropdownTime] = useState("");
  const [peopleInput, setPeopleInput] = useState("");
  const [showTimes, setShowTimes] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);

  
  const [showNotifyModal, setShowNotifyModal] = useState(false);
  const [notifyEmail, setNotifyEmail] = useState("");
  const [notifyDate, setNotifyDate] = useState(null);
  const [notifyTime, setNotifyTime] = useState("");
  const [notifyPeople, setNotifyPeople] = useState("");

  const [notifyStep, setNotifyStep] = useState("form");
  
  const [notifySuccess, setNotifySuccess] = useState("");

  const menuItems = [
    {
      name: "Truffle Mushroom Risotto",
      description: "Creamy risotto with wild mushrooms and shaved truffle.",
      price: "£28",
      image: truffleMushroomRisotto,
    },
    {
      name: "Crispy Duck Confit",
      description: "Slow-cooked duck served with an orange honey glaze.",
      price: "£32",
      image: crispyDuckConfit,
    },
    {
      name: "Seared Halibut",
      description: "Fresh halibut with lemon butter sauce on sautéed spinach.",
      price: "£30",
      image: searedHalibut,
    },
    {
      name: "Vanilla Panna Cotta",
      description: "Silky Italian dessert topped with seasonal berries.",
      price: "£12",
      image: vanillaPannaCotta,
    },
  ];

  const photosArray = [
    { src: bookingphoto1, caption: "Fine dining at Ormer Mayfair" },
    { src: bookingphoto2, caption: "Elegant ambiance of the dining room" },
    { src: bookingphoto3, caption: "A pristine table setting, ready for guests" },
  ];

  const popularDishesArray = [
    { name: "German chocolate cake", image: germancake, orders: 90 },
    { name: "House spicy chicken salad", image: spicysalad, orders: 150 },
    { name: "Sourdough and olive bread", image: sourdough, orders: 80 },
  ];

  const ReviewStars = ({ rating }) => {
    const stars = [];
    let remaining = rating;
    for (let i = 0; i < 5; i++) {
      if (remaining >= 1) {
        stars.push(<FaStar key={i} className="star filled" />);
        remaining -= 1;
      } else if (remaining >= 0.5) {
        stars.push(<FaStarHalfAlt key={i} className="star filled" />);
        remaining = 0;
      } else {
        stars.push(<FaRegStar key={i} className="star empty" />);
      }
    }
    return <div className="review-stars">{stars}</div>;
  };

  
  const maskEmail = (email) => {
    const [local, domain] = email.split("@");
    if (!local || !domain) return email;
    return local[0] + "****@" + domain;
  };

 
  const renderTabContent = () => {
    switch (activeTab) {
      case "Overview":
        return (
          <div className="tab-content">
            <div className="tab-content-inner">
              <p>
                Ormer Mayfair, a One-Michelin-starred restaurant in London led by Executive Chef Sofian Msetfi, offers a menu that blends his Moroccan and Irish roots with expertise gained at top UK and Irish restaurants. Diners can enjoy an exhilarating set tasting menu with pescatarian, vegetarian, and vegan options (48 hours' notice required for vegan), all featuring the finest seasonal ingredients. The restaurant has earned numerous prestigious accolades, including its first Michelin star in 2024, four AA Rosettes, and recognition as one of the top five restaurants in London by the Hardens Restaurant Guide. It also consistently ranks among the top fine dining spots on TripAdvisor.
              </p>
            </div>
          </div>
        );
      case "Reviews":
        return (
          <div className="tab-content">
            <div className="tab-content-inner reviews-grid">
              <div className="review-card">
                <ReviewStars rating={5.0} />
                <p className="review-text">
                  Wonderful experience. Food and ambiance were top-notch.
                </p>
                <span className="review-author">- Alex</span>
              </div>
              <div className="review-card">
                <ReviewStars rating={3.5} />
                <p className="review-text">
                  Service was okay, but the dishes made up for it.
                </p>
                <span className="review-author">- Jamie</span>
              </div>
            </div>
          </div>
        );
      case "Menu":
        return (
          <div className="tab-content">
            <div className="menu-grid tab-content-inner">
              {menuItems.map((item) => (
                <div className="menu-card" key={item.name}>
                  <img src={item.image} alt={item.name} className="menu-card-img" />
                  <div className="menu-card-info">
                    <p className="menu-card-name">{item.name}</p>
                    <p className="menu-card-desc">{item.description}</p>
                    <p className="menu-card-price">{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case "Photos":
        return (
          <div className="tab-content">
            <div className="photos-grid tab-content-inner">
              {photosArray.map((photo, i) => (
                <div className="photo-card" key={i}>
                  <img src={photo.src} alt={photo.caption} className="photo-card-img" />
                  <p className="photo-card-caption">{photo.caption}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case "Popular dishes":
        return (
          <div className="tab-content">
            <div className="popular-dishes-grid tab-content-inner">
              {popularDishesArray.map((dish, idx) => (
                <div className="dish-card" key={idx}>
                  <p className="dish-name">{dish.name}</p>
                  <img src={dish.image} alt={dish.name} className="dish-card-img" />
                  <p className="dish-ordered">
                    <FaChartLine className="chart-icon" /> {dish.orders} ordered this week
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  
  const timeSlots = ["16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];

  
  const handleCheckTimes = () => {
    setShowTimes(true);
    setSelectedTime(null);
  };

  
  const handleSelectTime = (slot) => {
    setSelectedTime(slot);
  };

  
  const handleConfirmBooking = () => {
    if (!selectedTime) {
      alert("Please select a time before confirming your booking.");
      return;
    }
    navigate("/finalizebooking");
  };

  
  const handleNotifySubmit = (e) => {
    e.preventDefault();
    setNotifyStep("confirmation");
  };

  
  const handleCloseNotify = () => {
    const masked = maskEmail(notifyEmail);
    setNotifySuccess(`Email reminder has been set up for ${masked}`);
   
    setNotifyEmail("");
    setNotifyDate(null);
    setNotifyTime("");
    setNotifyPeople("");
    setShowNotifyModal(false);
    setNotifyStep("form");
  };

  return (
    <div className="booking-page">
      {/* Banner and Restaurant Title */}
      <img src={banner} alt="Banner" className="booking-banner-img" />
      <h1 className="restaurant-title">Ormer Mayfair, London</h1>

      {/* Restaurant Info Line */}
      <div className="restaurant-info-line">
        <div className="stars">
          <FaStar className="star filled" />
          <FaStar className="star filled" />
          <FaStar className="star filled" />
          <FaStar className="star filled" />
          <FaStarHalfAlt className="star filled" />
        </div>
        <span className="info-text">4.4</span>
        <FaCommentDots className="info-icon" />
        <span className="info-text">3456 reviews</span>
        <FaMoneyBillWave className="info-icon" />
        <span className="info-text">£50 and above</span>
        <FaUtensils className="info-icon" />
        <span className="info-text">Moroccan</span>
      </div>

      {/* Tabs Row */}
      <div className="tabs-and-booking-title">
        <div className="booking-tabs">
          {["Overview", "Reviews", "Menu", "Photos", "Popular dishes"].map((tab) => (
            <button
              key={tab}
              className={`tab-button ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Main Layout */}
      <div className="booking-layout">
        <div className="left-content">{renderTabContent()}</div>

        <div className="booking-form-section">
          <h2 className="make-booking-title">Make a booking</h2>
          <div className="booking-form-container">
            {/* Date, Time, People Inputs */}
            <div className="booking-inputs-row">
              <div className="booking-field">
                <ReactDatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  placeholderText="Select date"
                  dateFormat="dd/MM/yyyy"
                  customInput={
                    <div className="date-input-wrapper">
                      <input
                        className="booking-input"
                        value={selectedDate ? selectedDate.toLocaleDateString("en-GB") : ""}
                        readOnly
                      />
                      <FaRegCalendarAlt className="calendar-icon" />
                    </div>
                  }
                  calendarClassName="calendar-popup"
                />
              </div>
              <div className="booking-field">
                <FaRegClock className="booking-icon" />
                <select
                  className="booking-select"
                  value={dropdownTime}
                  onChange={(e) => setDropdownTime(e.target.value)}
                >
                  <option value="">Select time</option>
                  {[...Array(11)].map((_, i) => {
                    const hour = 12 + i;
                    return (
                      <option key={hour} value={`${hour}:00`}>
                        {hour}:00
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="booking-field">
                <FaUser className="booking-icon" />
                <select className="booking-select">
                  {[...Array(6)].map((_, i) => {
                    const ppl = i + 1;
                    return (
                      <option key={ppl} value={ppl}>
                        {ppl} {ppl === 1 ? "person" : "people"}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            {/* Check Availability Button */}
            <button
              className="check-availability-btn"
              onClick={handleCheckTimes}
              disabled={!selectedDate || !dropdownTime}
            >
              Check Availability
            </button>

            {showTimes && <p className="select-time-label">Select a time</p>}
            {showTimes && (
              <div className="time-buttons-row">
                {timeSlots.map((slot) => {
                  const isSelected = selectedTime === slot;
                  return (
                    <div
                      key={slot}
                      className={`time-slot ${isSelected ? "time-slot-selected" : ""}`}
                      onClick={() => handleSelectTime(slot)}
                    >
                      <div className="time-slot-label">{slot}</div>
                    </div>
                  );
                })}
                <div
                  className="time-slot notify-btn"
                  style={{ minWidth: "100px" }}
                  onClick={() => {
                    setShowNotifyModal(true);
                    setNotifyStep("form");
                  }}
                >
                  <FaBell className="bell-icon" />
                  <div className="time-slot-label">Notify me</div>
                </div>
              </div>
            )}

            {showTimes && (
              <>
                <button
                  className="confirm-booking-btn"
                  onClick={handleConfirmBooking}
                  disabled={!selectedTime}
                >
                  Confirm Booking
                </button>
                <p className="booked-this-week">
                  <FaChartLine className="chart-icon" /> 100 Booked this week
                </p>
              </>
            )}

            {notifySuccess && (
              <p className="notify-success-message">{notifySuccess}</p>
            )}
          </div>
        </div>
      </div>

      {/* Notify Me Modal */}
      {showNotifyModal && (
        <div className="notify-modal-overlay">
          <div className="notify-me-modal">
            {notifyStep === "form" && (
              <>
                <div className="notify-me-modal-header">
                  <h2 className="notify-me-title">Notify Me</h2>
                  <FaTimes
                    className="notify-me-close"
                    onClick={() => {
                      setShowNotifyModal(false);
                      setNotifyStep("form");
                    }}
                  />
                </div>
                <p className="notify-me-subtitle">
                  Enter your details and we’ll let you know if the slot becomes available.
                </p>
                <form className="notify-me-form" onSubmit={handleNotifySubmit}>
                  <label className="notify-label">Email address</label>
                  <input
                    type="email"
                    className="notify-input"
                    value={notifyEmail}
                    onChange={(e) => setNotifyEmail(e.target.value)}
                    placeholder="Email address"
                    required
                  />
                  <label className="notify-label">Preferred Date</label>
                  <ReactDatePicker
                    selected={notifyDate}
                    onChange={(date) => setNotifyDate(date)}
                    placeholderText="Select date"
                    dateFormat="dd/MM/yyyy"
                    className="notify-input"
                    required
                  />
                  <label className="notify-label">Preferred Time</label>
                  <select
                    className="notify-input"
                    value={notifyTime}
                    onChange={(e) => setNotifyTime(e.target.value)}
                    required
                  >
                    <option value="">Select time</option>
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                  <label className="notify-label">Number of People</label>
                  <select
                    className="notify-input"
                    value={notifyPeople}
                    onChange={(e) => setNotifyPeople(e.target.value)}
                    required
                  >
                    <option value="">Select</option>
                    {[...Array(6)].map((_, i) => {
                      const ppl = i + 1;
                      return (
                        <option key={ppl} value={ppl}>
                          {ppl} {ppl === 1 ? "person" : "people"}
                        </option>
                      );
                    })}
                  </select>
                  <div className="notify-me-button-wrap">
                    <button type="submit" className="notify-me-submit-centered">
                      Notify me
                    </button>
                  </div>
                </form>
              </>
            )}
            {notifyStep === "confirmation" && (
              <>
                <div className="notify-me-modal-header">
                  <h2 className="notify-me-title">Check your email</h2>
                  <FaTimes
                    className="notify-me-close"
                    onClick={handleCloseNotify}
                  />
                </div>
                <p className="notify-me-subtitle">
                  you'll receive an email if a slot becomes avalaible.<br />
                  Reminder set for {maskEmail(notifyEmail)}
                </p>
              </>
            )}
          </div>
        </div>
      )}
      {/* End Notify Me Modal */}
    </div>
  );
};

export default Booking;
