const express = require('express');
const router = express.Router();
const hotelController = require("../controllers/hotelController")

router.get("/getHotels",hotelController.getHotels)
//metodo post para crear (guardar un hotel)

module.exports = router;