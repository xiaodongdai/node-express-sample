var express = require('express');
var app = express();
var postgres = require('./lib/postgres')
var bodyParser = require('body-parser')

// Our handler function is passed a request and response object¨
var router = express.Router();
app.use(bodyParser.json())  
app.post('/reportTime', function(req, res) {
  // We must end the request when we are done handling it
  var time = req.params.time
  var sql = 'INSERT INTO rank (time) values ($1)'
  var data = [req.body.time] 
  postgres.client.query(sql, data, function(err, result) {
    if (err) {
      // We shield our clients from internal errors, but log them
      console.error(err);
      res.statusCode = 500;
      return res.json({
        errors: ['Failed to create photo']
      });
    }
    
    // return the rank  
    var sql = 'SELECT count(*) FROM rank WHERE time < $1'
    postgres.client.query(sql, [ req.body.time ], function(err, result) {
      if (err) {
        // We shield our clients from internal errors, but log them
        console.error(err);
        res.statusCode = 500;
        return res.json({
          errors: ['Could not retrieve photo after create']
        });
      }
     res.statusCode = 200
     res.json(result.rows[0])
    })
  })
  //res.end();
})

module.exports = app;
