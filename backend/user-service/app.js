const express = require('express');
const dbConnect = require('./config/db');
require('dotenv').config();

const app = express();
dbConnect()

app.use(express.json())
app.use('/auth',require('./routes/auth'));

app.listen(process.env.PORT, () =>{
    console.log(`User service is running on port ${process.env.PORT}`);
})