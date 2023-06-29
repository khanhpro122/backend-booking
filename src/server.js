import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from "./config/connectDb"
const cors = require('cors');
const cookieParser = require('cookie-parser')
require('dotenv').config();

let app = express();

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin',process.env.URL_REACT);
    res.setHeader('Access-Control-Allow-Headers',"*");
    res.header('Access-Control-Allow-Credentials', true);
    next();
});

app.use(cors())
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cookieParser())

viewEngine(app);
initWebRoutes(app);

connectDB()

let port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Backend Nodejs is running on the port: ${port}`);
});