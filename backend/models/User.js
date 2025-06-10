const pool = require('../db');

const getAllUsers = async () => {
    const result = await pool.query("SELECT * FROM users");
    return result.rows;
};

//const createUser

module.exports = {getAllUsers}