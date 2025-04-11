import React, { useState } from "react";
import {
  FaMapMarkerAlt,
  FaRegCalendarPlus,
  FaTimes,
  FaClock
} from "react-icons/fa";
import "../styles/ConfirmBooking.css";

const ConfirmBooking = () => {
  // State for cancellation modal
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [bookingCancelled, setBookingCancelled] = useState(false);

  // State for change modal
  const [showChangeModal, setShowChangeModal] = useState(false);
  const [bookingChanged, setBookingChanged] = useState(false);

  const handleViewInMaps = () => {
    window.open(
      "https://www.google.com/maps?sca_esv=7efe9108e6e32fec&output=search&q=ormer+mayfair&source=lnms",
      "_blank"
    );
  };

  const handleAddToCalendar = () => {
    // Generate a simple ICS file for download
    const bookingStart = "20250214T140000Z"; // booking start time in UTC
    const bookingEnd = "20250214T150000Z";   // booking end time (1 hour later)
    const uid = new Date().getTime() + "@ormermayfair.com";
    const icsData = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//OrmerMayfair//Booking Confirmation//EN",
      "BEGIN:VEVENT",
      `UID:${uid}`,
      `DTSTAMP:${bookingStart}`,
      `DTSTART:${bookingStart}`,
      `DTEND:${bookingEnd}`,
      "SUMMARY:Booking Confirmation - Ormer Mayfair, London",
      "DESCRIPTION:Your booking is confirmed for 4 people at Ormer Mayfair, London.",
      "LOCATION:Ormer Mayfair, London",
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n");

    const blob = new Blob([icsData], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "booking.ics";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Cancel modal handlers
  const handleCancelBooking = () => {
    setShowCancelModal(true);
  };

  const closeCancelModal = () => {
    setShowCancelModal(false);
    setBookingCancelled(false);
  };

  const confirmCancel = () => {
    console.log("Booking canceled!");
    // Insert any additional cancellation logic/API call here
    setBookingCancelled(true);
  };

  // Change modal handlers
  const handleChangeBooking = () => {
    setShowChangeModal(true);
  };

  const closeChangeModal = () => {
    setShowChangeModal(false);
    setBookingChanged(false);
  };

  const handleChangeSubmit = (e) => {
    e.preventDefault();
    // Retrieve the new booking details
    const newDate = e.target.newDate.value;
    const newTime = e.target.newTime.value;
    const newPeople = e.target.newPeople.value;

    console.log("Booking updated to:", newDate, newTime, newPeople);
    // Insert your API call or further processing logic here

    setBookingChanged(true);
  };

  return (
    <div className="confirm-booking-page">
      <h1 className="confirm-title">Ormer Mayfair, London</h1>
      <p className="booking-details">
        Sun, 14th Feb at 14:00 for 4 people
      </p>

      <div className="success-icon-container">
        <div className="success-icon">✔</div>
        <h2 className="confirm-status">Success</h2>
        <p className="confirmation-text">
          Congratulations, your booking is now confirmed.
        </p>
      </div>

      <div className="action-buttons">
        <button className="outline-button" onClick={handleViewInMaps}>
          <FaMapMarkerAlt className="action-icon" /> View in maps
        </button>
        <button className="outline-button" onClick={handleAddToCalendar}>
          <FaRegCalendarPlus className="action-icon" /> Add to calendar
        </button>
      </div>

      <div className="bottom-buttons">
        <button className="filled-button" onClick={handleCancelBooking}>
          <FaTimes className="btn-icon" /> Cancel
        </button>
        <button className="filled-button" onClick={handleChangeBooking}>
          <FaClock className="btn-icon" /> Change
        </button>
      </div>

      {/* Cancel Booking Modal */}
      {showCancelModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={closeCancelModal}>
              <FaTimes />
            </button>

            {!bookingCancelled ? (
              <>
                <h2>Cancel Booking</h2>
                <p className="modal-message">
                  Are you sure you want to cancel this booking?
                </p>
                <button className="confirm-button" onClick={confirmCancel}>
                  Cancel Booking
                </button>
              </>
            ) : (
              <>
                <h2>Booking Cancelled</h2>
                <p className="modal-message">
                  Your booking is now cancelled. You will receive an email at{" "}
                  <strong>user@Outlook.com</strong> with the cancellation details shortly.
                </p>
                <button className="confirm-button" onClick={closeCancelModal}>
                  Close
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Change Booking Modal */}
      {showChangeModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={closeChangeModal}>
              <FaTimes />
            </button>

            {!bookingChanged ? (
              <>
                <h2>Change Booking</h2>
                <p className="modal-message">Enter new booking details below</p>

                <form className="change-form" onSubmit={handleChangeSubmit}>
                  <label>
                    New Date
                    <input
                      type="date"
                      name="newDate"
                      required
                    />
                  </label>

                  <label>
                    New Time
                    <select name="newTime" required>
                      <option value="12:00">12:00</option>
                      <option value="13:00">13:00</option>
                      <option value="14:00">14:00</option>
                      <option value="15:00">15:00</option>
                      <option value="16:00">16:00</option>
                      <option value="17:00">17:00</option>
                      <option value="18:00">18:00</option>
                      <option value="19:00">19:00</option>
                      <option value="20:00">20:00</option>
                      <option value="21:00">21:00</option>
                      <option value="22:00">22:00</option>
                    </select>
                  </label>

                  <label>
                    Number of People
                    <select name="newPeople" required>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                    </select>
                  </label>

                  <button type="submit" className="confirm-button">
                    Confirm Changes
                  </button>
                </form>
              </>
            ) : (
              <>
                <h2>Booking Changed</h2>
                <p className="modal-message">Your booking has been updated.</p>
                <p className="modal-message">
                  Email confirmation will be sent to <strong>user@Outlook.com</strong> shortly.
                </p>
                <button className="confirm-button" onClick={closeChangeModal}>
                  Close
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfirmBooking;
