const pool = require("../db");

const getAllDailyMetrics = async () => {
  const result = await pool.query("SELECT * FROM daily_metrics");
  return result.rows;
};


//const addDailyMetric


//const modifyDailyMetric?

module.exports = {getAllDailyMetrics}