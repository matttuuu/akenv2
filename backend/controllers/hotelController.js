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

const getHotelTokens= async(req, res) => {
    try {
        const hotelName = req.query.name; // <-- Cambia esto
        const tokens = await hotelModel.getHotelTokensByName(hotelName);
        res.json(tokens);
    }
    catch (error) {
        console.log(error); 
        res.status(500).send("Error obteniendo tokens del hotel");
    }
}
//const saveHotel

module.exports = {getHotels,getHotelTokens}