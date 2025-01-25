require('dotenv').config();
const express = require('express');
const DB_CONNECTION = require('./config/db');
const UserRoutes = require('./routes/user.route')
const cors = require('cors')
const app = express();



// MiddleWare
app.use(express.json());
app.use('/api/users',UserRoutes)
app.use(cors())
DB_CONNECTION;



// LISTENING
app.listen(process.env.PORT,() => {
    console.log("________ START LISTING ON PORT 5000 ________")
})