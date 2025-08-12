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
        const hotelName = req.query.name; // req.query.name es el nombre del hotel que se pasa como parámetro en la URL; en base a este, obtenemos los tokens
        const tokens = await hotelModel.getHotelTokensByName(hotelName);
        res.json(tokens); //La respuesta será un objeto con clienttoken y accesstoken
    }

    catch (error) {
        console.log(error); 
        res.status(500).send("Error obteniendo tokens del hotel");
    }
    
}
//const saveHotel

module.exports = {getHotels,getHotelTokens}