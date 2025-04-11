import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Booking from './components/Booking';
import FinalizeBooking from './components/FinalizeBooking';
import ConfirmBooking from './components/ConfirmBooking';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/finalizebooking" element={<FinalizeBooking />} />
        <Route path="/confirm" element={<ConfirmBooking />} />
      </Routes>
    </Router>
  );
}

export default App;
