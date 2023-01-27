const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');

require('dotenv').config();

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, 'views'))

app.set('layout', 'layout');

app.use("/public", express.static(__dirname + '/public'));
app.use('/node_modules', express.static(path.join(__dirname + '/node_modules')))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cookie와 Session을 미들웨어로 등록
app.use(cookieParser());
app.use(expressSession({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { 
        httpOnly: true,
        secure: false,
        maxAge: (3.6e+6)*24,
     }
}));

const router = require("./routes/index");
app.use(expressLayouts, router);

mongoose.connect("mongodb://localhost:27017/node", { useNewUrlParser: true, useUnifiedTopology: true }, function(err) {
    if(err) {
        console.error("mongoDB Connection Error!", err);
    }
    console.log("mongoDB Connected!");

    app.listen(3000, function() {
        console.log("Server listening on port 3000!");
    });
});
