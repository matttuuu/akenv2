const pool = require("../db");

const getAllDailyMetrics = async () => {
  const result = await pool.query("SELECT * FROM daily_metrics");
  return result.rows;
};

const getDailyMetricBySingleDate = async (metricDate) => { //Seleccionamos un registro de 'daily_metrics' por fecha especifica (timestamp)
  const result = await pool.query(`SELECT * FROM daily_metrics
    WHERE createdat:: date = `,metricDate); // ej: '2025-07-24' - Este formato debe salir del calendario 
  return result
};

const getDailyMetricsByDateRange = async () => { //Seleccionamos mas de un registro de 'daily_metrics' por rango de fechas (between timestamp)
  
}

// Inserta una métrica usando los tokens para buscar el hotel_id
const addDailyMetric = async (
  clientToken,
  accessToken,
  checkIns,
  checkOuts,
  confirmedReserves,
  cancelledReserves,
  adr
) => {
  const result = await pool.query(
    `
    INSERT INTO daily_metrics (
      hotel_id,
      checkins,
      checkouts,
      confirmedreserves,
      cancelledreserves,
      adr
    )
    SELECT id, $3, $4, $5, $6, $7
    FROM hotels
    WHERE clienttoken = $1 AND accesstoken = $2
    RETURNING *;
    `,
    [
      clientToken,
      accessToken,
      checkIns,
      checkOuts,
      confirmedReserves,
      cancelledReserves,
      adr,
    ]
  );

  return result;
};

//const modifyDailyMetric?

module.exports = { getAllDailyMetrics, addDailyMetric };
