const testUserModel = require("../models/TestUser");

const getTestUsers = async (req, res) => {
  try {
    const users = await testUserModel.getAllTestUsers();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error de servidor...");
  }
};

const createTestUser = async(req,res) => {
    try {
      const {dummyName,dummyAge} = req.body;
      await testUserModel.createTestUser(dummyName,dummyAge)
      res.status(201).send("Usuario de prueba creado") //SOLUCIONAR: se crea el usuario, pero me sigue dando error (probado desde postman, raw json)
    }
    catch (error) {
      console.error(error);
      res.status(500).send("Error de servidor...");
    }
};

module.exports = { getTestUsers, createTestUser };
