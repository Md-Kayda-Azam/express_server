const express = require('express');
const app = express();
const dotenv = require('dotenv').config();

// enviroment variable
const PORT = process.env.SERVER_PORT;

/// req body init 
app.use(express.json());
app.use(express.urlencoded({ extended : false}))


/// students route use
app.use('/api/students', require('./routes/students'))


//// All Express Server Listener with post
app.listen(PORT, () => console.log(`express server is runing ${PORT}`))