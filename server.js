// server.js
// where your node app starts
// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();
const bodyParser = require('body-parser')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)
const port = 3000;


db.defaults({ works: [] }).write();

app.set("views", "./views");
app.set("view engine", "pug");
// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())




app.get("/", (req, res) => {
  res.render("index");
});

app.get("/todos", (req, res) => {
  res.render("works/milos", {
    works: db.get('works').value()
  });
});

app.get("/todos/search", (req, res) => {
  var q = req.query.q;
  var question;
  var search = db.get('works').value().filter(work =>{
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
  console.log('123')
  db.get("works").push(req.body).write();
  console.log('456')
  res.redirect("/todos")
});

// listen for requests :)
app.listen(port, () => {
  console.log("Your app is listening on port " + port);
});
