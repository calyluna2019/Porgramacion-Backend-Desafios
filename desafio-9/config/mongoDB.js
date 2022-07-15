const mongoose = require('mongoose');
require('dotenv').config();
const dbConnection = async() =>{
    try{
        await mongoose.connect(process.env.MONGO_CNN,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });
    } catch(e){
        throw new Error(`Error en DB ${e.message}`);
    }
}

module.exports = {
    dbConnection
};