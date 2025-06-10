const hotelModel = require("../models/Hotel");

const getHotels = async(req,res) => {
    try{
        const hotels = await hotelModel.getAllHotels();
        res.json(hotels);
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Error obteniendo lista de hoteles..." );
    }
}

//const saveHotel

module.exports = {getHotels}