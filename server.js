var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");

var app = express();
app.use(bodyParser.json());
app.use(cors());

//include static files from dashboard server
app.use('/dashboard', express.static('dashboard'));
app.use('/pos', express.static('pos'));

// REST methods
app.get('/products', function(req,res){
    res.status(200).send([{name:"COCA_COLA",price:2.99},{name:"PEPSI",price:2.66},{name:"FANTA", price:2.99}]);
});

app.listen(process.env.PORT);

