// server.js
// where your node app starts
// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();
const bodyParser = require('body-parser')
const port = 3000;


app.set("views", "./views");
app.set("view engine", "pug");
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var db = require('./db')
var routeWorks = require('./route/todos.route')

app.get("/", (req, res) => {
  res.render("index");
});

app.use('/todos', routeWorks)

// listen for requests :)
app.listen(port, () => {
  console.log("Your app is listening on port " + port);
});
