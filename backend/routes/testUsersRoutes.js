const express = require('express');
const router = express.Router();
const userController = require('../controllers/testUserController');



router.get('/getTestUsers',userController.getTestUsers);  // De no colocarse nada en el primer parametro string (solo la barra), el endpoint es solamente lo que se indique en el archivo index.js
router.post('/createTestUser',userController.createTestUser); // // Comentado hasta que toque probar el creado de usuarios fake

module.exports = router;