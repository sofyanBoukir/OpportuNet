const express = require('express');
const dbConnect = require('./config/db');
const cors = require("cors")
require('dotenv').config();

const app = express();

dbConnect()
app.use(cors({
    'origin' : process.env.FRONTEND_URL
}))

app.use(express.json())
app.use('/auth',require('./routes/auth'));
app.use('/interest',require('./routes/interest'));
app.use('/profile',require('./routes/profile'));

app.listen(process.env.PORT, () =>{
    console.log(`User service is running on port ${process.env.PORT}`);
})