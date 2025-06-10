const dailyMetricModel = require("../models/DailyMetric")

const getDailyMetrics = async(req,res) => {
    try{
        const metrics = await dailyMetricModel.getAllDailyMetrics();
        res.json(metrics);
    }
    catch (error){      
        console.log(error)
        res.status(500).send("Hubo un error obteniendo las metricas de la base de datos")
    }
}


//metodos que se implementen en el modelo se consultan desde acá

module.exports = {getDailyMetrics}