const pool = require("../db");

const getAllHotels = async () => {
    const result = await pool.query("SELECT * FROM hotels");
    return result.rows;
}

const getHotelTokensByName = async (hotelName) => {
    const result = await pool.query("SELECT clienttoken, accesstoken FROM hotels WHERE name = $1", [hotelName]);
    return result.rows[0]; // Assuming hotelName is unique, return the first match
}


//const add hotel?

module.exports = {getAllHotels, getHotelTokensByName}