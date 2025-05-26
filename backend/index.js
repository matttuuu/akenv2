const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');
const PORT = 3000; //Puerto en el que corre node.js. Angular siempre en el 4200
require('dotenv').config();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Servidor funcionando');
});




// app.get('')
//Rutas de prueba, API
app.get('/api/usuarios', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM  test'); //tabla test de db postgre
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en el servidor');
  }
});



// Crear usuario
app.post('/api/usuarios', async (req, res) => {
  try {
    const { nombre } = req.body;
    await pool.query('INSERT INTO test (nombre) VALUES($1)', [nombre]);
    res.status(201).send('Usuario creado');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al crear usuario');
  }
});



app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
//funciona, verificar rutas, demas comandos y funciones (posible usar marejada de ejemplo)