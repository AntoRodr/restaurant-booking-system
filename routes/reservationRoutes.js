const express = require("express");
const router = express.Router();
const { makeReservation, getAvailability } = require("../controllers/reservationController");

router.post("/", makeReservation);
router.get("/availability", getAvailability);

module.exports = router;
