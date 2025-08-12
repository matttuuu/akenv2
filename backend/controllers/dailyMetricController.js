const dailyMetricModel = require("../models/DailyMetric");

const getDailyMetrics = async (req, res) => {
  try {
    const metrics = await dailyMetricModel.getAllDailyMetrics();
    res.json(metrics);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error obtaining metrics from DB");
  }
};

const addDailyMetric = async (req, res) => {
  const {
    clientToken,
    accessToken,
    checkIns,
    checkOuts,
    confirmedReserves,
    cancelledReserves,
    adr,
  } = req.body;

  try {
    const result = await dailyMetricModel.addDailyMetric(
      clientToken,
      accessToken,
      checkIns,
      checkOuts,
      confirmedReserves,
      cancelledReserves,
      adr
    );

    if (result.rowCount === 0) {
      return res
        .status(404)
        .json({ message: "Hotel no encontrado con esos tokens" });
    }

    res
      .status(201)
      .json({ message: "Métrica registrada", data: result.rows[0] });
  } catch (error) {
    console.error("Error al insertar métrica:", error);
    res.status(500).json({ error: "Error interno al insertar métrica" });
  }
};

const getDailyMetricsByRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;
    const data = await dailyMetricModel.getDailyMetricsByDateRange(
      startDate,
      endDate
    );
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error de Servidor, no se pudieron obtener metricas");
  }
};

const getDailyMetricByDate = async (req, res) => { //BY DATE AND HOTEL - CAMBIADO
  try {
    //obtener la fecha desde query parameteres en lugar del body
    const { date, hotelId } = req.query; // Cambiado a body para que coincida con el modelo (de esta manera, se me permite hacer la consulta raw en postman)

    if (!date || !hotelId) {
      return res.status(400).json({ error: "Fecha y hotelId son requeridos" });
    }

    const data = await dailyMetricModel.getDailyMetricByDateAndHotel(date, hotelId);

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error de servidor, no se pudo obtener la info de métricas del día y hotel especificados");
  }
};

//metodos que se implementen en el modelo se consultan desde acá

module.exports = {
  getDailyMetrics,
  addDailyMetric,
  getDailyMetricsByRange,
  getDailyMetricByDate,
  
};
