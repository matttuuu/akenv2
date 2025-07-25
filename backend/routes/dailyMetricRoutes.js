const express = require('express');
const router = express.Router();
const dailyMetricController = require("../controllers/dailyMetricController");


router.get("/getDailyMetrics",dailyMetricController.getDailyMetrics);
//demas metodos de metricas

router.post("/addDailyMetric",dailyMetricController.addDailyMetric)

module.exports = router