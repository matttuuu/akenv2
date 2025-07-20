const pool = require("../db");

const getAllDailyMetrics = async () => {
  const result = await pool.query("SELECT * FROM daily_metrics");
  return result.rows;
};


const addDailyMetric  =async (hotelId,checkIns, checkOuts,  cancelledReserves,confirmedReserves,adr ) => {
  await pool.query('INSERT INTO daily_metrics (hotel)')
}


//const modifyDailyMetric?

module.exports = {getAllDailyMetrics}