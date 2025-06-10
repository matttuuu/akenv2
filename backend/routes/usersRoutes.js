const express = require('express');
const router = express.Router();
const usersController = require("../controllers/userController")

router.get("/getUsers",usersController.getUsers);
//metodo post para crear un usuario

module.exports = router;