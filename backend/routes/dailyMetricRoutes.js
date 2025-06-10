const express = require('express');
const router = express.Router();
const dailyMetricController = require("../controllers/dailyMetricController");


router.get("/getDailyMetrics",dailyMetricController.getDailyMetrics);
//demas metodos de metricas

module.exports = router