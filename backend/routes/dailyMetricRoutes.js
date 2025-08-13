const express = require('express');
const router = express.Router();
const dailyMetricController = require("../controllers/dailyMetricController");


router.get("/getDailyMetrics",dailyMetricController.getDailyMetrics);
//demas metodos de metricas

router.post("/addDailyMetric",dailyMetricController.addDailyMetric)

router.get("/getDailyMetricsByRange", dailyMetricController.getDailyMetricsByRange); //Check 's' en 'metrics'

router.get("/getDailyMetricByDate", dailyMetricController.getDailyMetricByDate)

//router.get("/getDailyMetricsBySingleDate", dailyMetricController.getDailyMetricBySingleDate); //no se usa por ahora


module.exports = router