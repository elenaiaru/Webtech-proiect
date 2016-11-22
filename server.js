var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var Sequelize = require("sequelize");

// init sequelize connexion
var sequelize = new Sequelize('Restaurant', 'elenaiaru', '', {
   dialect: 'mysql',
   host: '127.0.0.1',
   port: 3306
});

// define entity
/*
var Preparat = sequelize.define('preparate', {
  tdenumire: {
    type: Sequelize.STRING,
    field: 'denumire'
  },
  cantitate: {
    type: Sequelize.DOUBLE,
    field: 'cantitate'
  },
  pret: {
    type: Sequelize.DOUBLE,
    field: 'pret'
  },
  descriere: {
    type: Sequelize.STRING,
    field: 'descriere'
  },
  alergeni: {
    type: Sequelize.STRING,
    field: 'alergeni'
  }
}, {
  freezeTableName: false, // Model tableName will be the same as the model name
  timestamps: false
});
*/
// init express application
var app = express();
app.use(bodyParser.json());
app.use(cors());

// include static files in the admin folder
app.use('/admin', express.static('admin'));

// include nodeadmin app
var nodeadmin = require('nodeadmin');
app.use(nodeadmin(app));

// REST methods

// list all articles
app.get('/preparate', function(req,res){
    /*global Article*/
    Article.findAll().then(function(preparate){
        res.status(200).send(preparate);
    });
});

// list a specific article by id
app.get('/preparate/:id', function(req,res){
    Preparat.findAll({
        where: {
            id: req.params.id
        }
    }).then(function(preparat){
        if(preparat.length > 0) {
            res.status(200).send(preparat[0]);
        } else {
            res.status(404).send();
        }
    });
});

// create an article
app.post('/preparate', function(req,res) {
  res.status(200).send(req.body);
});

// update a specific article by id
app.put('/preparate/:id', function(req,res){
    Preparat
        .find({where : {id : req.params.id}})
        .then(function(preparat){
            return preparat.updateAttributes(req.body);
        })
        .then(function(){
            res.status(201).send('updated');
        })
        .catch(function(error){
            console.warn(error);
            res.status(400).send('not found');
        });
});

// delete an article by id
app.delete('/preparate/:id', function(req,res){
    Preparat
        .find({where : {id : req.params.id}})
        .then(function(preparat){
            return preparat.destroy();
        })
        .then(function(){
            res.status(201).send('deleted');
        })
        .catch(function(error){
            console.warn(error);
            res.status(400).send('not found');
        });
});

app.listen(process.env.PORT);
