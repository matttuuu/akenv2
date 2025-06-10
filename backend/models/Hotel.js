const pool = require("../db");

const getAllHotels = async () => {
    const result = await pool.query("SELECT * FROM hotels");
    return result.rows;
}

module.exports = {getAllHotels}