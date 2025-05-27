const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const PORT = 3000; //Puerto en el que corre node.js. Angular siempre en el 4200
require("dotenv").config();

app.use(cors());
app.use(express.json());

// RUTAS API
const testUserRoutes = require("./routes/testUsersRoutes");
app.use("/api/testUsers", testUserRoutes);

// RUTA RAIZ
app.get("/", (req, res) => {
  res.send("Servidor funcionando");
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
//funciona, verificar rutas, demas comandos y funciones (posible usar marejada de ejemplo)
