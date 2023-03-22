const express = require("express");
const connectDB = require('./configs/db.config')
const cors = require("cors");
const cookieParser = require('cookie-parser');
const helmet = require("helmet");
const multer = require("multer");
const https = require('https');
const path = require('path');
const fs = require('fs');

require('dotenv').config()

// import Routers
const userRouter = require("./routes/user.routes");
const authRouter = require("./routes/auth.routes");
// const options = {
//     key: fs.readFileSync(path.join(__dirname, 'configs', 'ssl', 'key.pem')),
//     cert: fs.readFileSync(path.join(__dirname, 'configs', 'ssl', 'cert.pem'))
// };


const app = express();
app.use(cookieParser());


// Middlewares
app.use(express.json())
app.use(cors({
    // origin: ['http://localhost:3000', 'http://127.0.0.1:5173', 'http://127.0.0.1:5173/', 'http://localhost:5173', 'http://127.0.0.1:5174/', 'https://localhost:5173', 'https://127.0.0.1:5173', 'http://127.0.0.1:5500/'],
    origin: true,
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
    // allowedHeaders: ['content-type']
    // preflightContinue: true
    // origin: '*'
}))
// app.use(helmet())


// Rooutes
app.use('/auth', authRouter);
app.use('/users', userRouter);


app.listen(process.env.PORT, () => {
    connectDB();
    console.log(`listening on port ${process.env.PORT}`);
})

// const options = {
//     key: '',
//     cert: ''
// };

// https.createServer(options, app).listen(8080, () => {
//     connectDB();
//     console.log('listening on 8000');
// })