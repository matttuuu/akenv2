const { get } = require("http");
const pool = require("../db");

const getAllDailyMetrics = async () => {
  const result = await pool.query("SELECT * FROM daily_metrics");
  return result.rows;
};

const getDailyMetricByDateAndHotel = async (metricDate, hotelId) => {
  //NUEVA, probando
  try {
    const query = `
      SELECT * FROM daily_metrics
      WHERE DATE(createdat) = $1
      AND hotel_id = $2
    `;

    const result = await pool.query(query, [metricDate, hotelId]);
    return result.rows;
  } catch (error) {
    console.error("Error en getDailyMetricByDateAndHotel", error);
    throw error;
  }
};

const getDailyMetricBySingleDate = async (metricDate) => {
  //Seleccionamos un registro de 'daily_metrics' por fecha especifica (timestamp) /////Se podra usar tambien en la seccion del dia de ayer en daily?

  try {
    const query = `
            SELECT * FROM daily_metrics
            WHERE DATE(createdat) = $1
            `;

    const result = await pool.query(query, [metricDate]);
    return result.rows; // Devuelve el primer registro encontrado ////PROBANDO : [0] o sin nada
  } catch (error) {
    console.error("Error en getDailyMetricsBySingleDate", error);
    throw error;
  }
};

const getDailyMetricsByDateRange = async (startDate, endDate, hotelId) => {
  //Posiblemente tenga que modificar esta para saber el id
  try {
    // Asegúrate de que las fechas estén en el formato correcto -----ERA ACA, EN EL MODELO, EN DONDE ESTABA EL ERRROR
    const query = `
            SELECT * FROM daily_metrics 
            WHERE DATE(createdat) >= DATE($1) 
            AND DATE(createdat) <= DATE($2)
            AND hotel_id = $3 
            ORDER BY createdat ASC
        `;

    const result = await pool.query(query, [startDate, endDate, hotelId]);
    return result.rows; // Devuelve las filas directamente
  } catch (error) {
    console.error("Error en getDailyMetricsByDateRange:", error);
    throw error; // Lanza el error para que lo maneje el controlador
  }
};

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

module.exports = {
  getAllDailyMetrics,
  addDailyMetric,
  getDailyMetricsByDateRange,
  getDailyMetricBySingleDate,
  getDailyMetricByDateAndHotel,
}; //byRange probado en postman, vamos a ver si anda single date en previous day
// Si anda tambien en previous day, se puede usar en el calendario para dia especifico tambien
