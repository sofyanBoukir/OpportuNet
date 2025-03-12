const mongoose = require('mongoose')
require('dotenv').config();

const dbConnect = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log('successfully connected to db!');
    }catch(erorr){
        console.log('Could not connect to DB ' , error);
    }
}

module.exports = dbConnect