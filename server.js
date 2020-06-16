// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();
const port = 3000;
var bodyParser = require('body-parser')
app.set("views", "./views");
app.set("view engine", "pug");
// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

var works = [
  {id :1, name:'Đi học'},
  {id :2, name:'Đi chợ'},
  {id :3, name:'Nấu cơm'},
  {id :4, name:'Thăm ngàn'}
]

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/todos", (req, res) => {
  res.render("works/milos", {
    works: works
  });
});

app.get("/todos/search", (req, res) => {
  var q = req.query.q;
  var question;
  var search = works.filter(work =>{
    return work.name.toLowerCase().indexOf(q.toLowerCase()) !==-1;
  });
  res.render('works/milos', {
    works: search,
    question: q
  });
});

app.get("/todos/create", (req, res) => {
  res.render('works/create');
});

app.post("/todos/create", (req, res) => {
  works.push(req.body);
  res.redirect('/todos')
});

// listen for requests :)
app.listen(port, () => {
  console.log("Your app is listening on port " + port);
});
