const express = require("express")
var mysql = require('mysql');
var connect = require("connect")
var app = express()
var http = require('http')
var store = require('store')
var fs = require('fs')
let port = 8080;


var connection = mysql.createConnection({
  host: 'ccdatabase.cklu0ptkuzc7.us-east-1.rds.amazonaws.com',
  database: 'ccprojectdb',
  user: 'admin',
  password: '12345678',
  connectTimeout: 60000
});

var data3 = []

connection.connect(function (err) {
  if (err) console.log(err);
  else console.log('connected!');
});

let sql = `SELECT * FROM places`;
connection.query(sql, (error, results, fields) => {
  if (error) {
    return console.error(error.message);
  }
  let data = JSON.stringify(results)
  let data2 = JSON.parse(data)
  for (i in data2) {
    co = { lat: data2[i].list_lat, lng: data2[i].list_lng }
    ct = { country: data2[i].list_country }
    data3.push([co, ct])
  }
  fs.writeFileSync("place.json", JSON.stringify(data3))
  
});

module.exports = connection;

app = connect().use(express.static("./"))

app.use(express.static("../"));

const server = http.createServer(app).listen(port)

