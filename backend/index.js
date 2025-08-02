const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const PORT = 3000; //Puerto en el que corre node.js. Angular siempre en el 4200
require("dotenv").config();

app.use(cors());
app.use(express.json());

//// RUTAS API
// Usuarios de prueba
const testUserRoutes = require("./routes/testUsersRoutes");
app.use("/api/testUsers", testUserRoutes);

//Usuarios
const usersRoutes = require("./routes/usersRoutes");
app.use("/api/users", usersRoutes)

//Hoteles
const hotelRoutes = require("./routes/hotelsRoutes")
app.use("/api/hotels",hotelRoutes)

//Metricas Daily
const dailyMetricRoutes = require("./routes/dailyMetricRoutes")
app.use("/api/dailyMetrics",dailyMetricRoutes)



//// RUTA RAIZ
app.get("/", (req, res) => {
  res.send("Servidor funcionando");
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
//funciona, verificar rutas, demas comandos y funciones (posible usar marejada de ejemplo)
