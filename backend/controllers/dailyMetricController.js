const dailyMetricModel = require("../models/DailyMetric")

const getDailyMetrics = async(req,res) => {
    try{
        const metrics = await dailyMetricModel.getAllDailyMetrics();
        res.json(metrics);
    }
    catch (error){      
        console.log(error)
        res.status(500).send("Error obtaining metrics from DB")
    }
}

const addDailyMetric = async (req, res) => {
  const {
    clientToken,
    accessToken,
    checkIns,
    checkOuts,
    confirmedReserves,
    cancelledReserves,
    adr
  } = req.body;

  try {
    const result = await dailyMetricModel. addDailyMetric(
      clientToken,
      accessToken,
      checkIns,
      checkOuts,
      confirmedReserves,
      cancelledReserves,
      adr
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Hotel no encontrado con esos tokens" });
    }

    res.status(201).json({ message: "Métrica registrada", data: result.rows[0] });
  } catch (error) {
    console.error("Error al insertar métrica:", error);
    res.status(500).json({ error: "Error interno al insertar métrica" });
  }
};


//metodos que se implementen en el modelo se consultan desde acá

module.exports = {getDailyMetrics,addDailyMetric}