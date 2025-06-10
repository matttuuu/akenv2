const UserModel = require("../models/User");

const getUsers = async (req, res) => {
  try {
    const users = await UserModel.getAllUsers();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error de servidor...");
  }
};

module.exports = { getUsers };
