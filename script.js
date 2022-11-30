const express=require("express")
var mysql = require('mysql');
var connect = require("connect")
var app = express()
let http = require('http');
let port = 8080;

var connection = mysql.createConnection({
  host: '34.227.172.138',
  database: 'geoguessr',
  user: 'root',
  port:22,
  connectTimeout:60000
});

connection.connect(function(err) {
  if (err) console.log(err);
  else console.log('connected!');
});

module.exports = connection;

app = connect().use(express.static("js"))

app.use(express.static("../js/"));

const server = http.createServer(app).listen(port)

