var express = require('express');
var app = express();
var port = process.env.port || 1234;


var cors = require('cors');
var bodyParser = require('body-parser');

//enables cors
app.use(cors({
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'origin': '*',
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
}));


var bodyParser = require('body-parser')
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));


var productController = require('./controller/ProductController')();
app.use("/crmdetails", productController);

// app.get("/product", function (request, response) {
//     response.json({ "Message": "Welcome to Node js" });
// });

app.listen(port, function () {
    var datetime = new Date();
    var message = "Server running on Port:- " + port + " Started at:- " + datetime;
    console.log(message);
});