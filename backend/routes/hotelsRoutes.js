const express = require('express');
const router = express.Router();
const hotelController = require("../controllers/hotelController")

router.get("/getHotels",hotelController.getHotels)
router.get("/getHotelTokensByName", hotelController.getHotelTokens);
//metodo post para crear (guardar un hotel)

module.exports = router;