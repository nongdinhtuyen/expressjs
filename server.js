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
const shortid = require('shortid')



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
  req.body.id = shortid.generate()
  db.get("works").push(req.body).write();
  res.redirect("/todos");
});

app.get("/todos/:id", (req, res) => {
  var id = req.params.id;
  var work = db.get('works').find({ id: id }).value();
  res.render("works/view" ,  {
    works: work
  });
  console.log(db.get('works').value())
});

app.get("/todos/:id/delete", (req, res) =>{
  var id = req.params.id;
  var work = db.get('works').find({ id: id }).value();
  res.render('works/delete', {
    works: work
  })
  console.log(db.get('works').find({ id: req.params.id }).value())
})

app.post("/todos/:id/delete", (req, res) => {
  var id = req.params.id;
  console.log(id)
  var work = db.get('works').find({ id: id }).value();
  db.get('works').remove({id: id}).write();
  res.redirect("/todos");
  console.log(db.get('works').value())
})

// listen for requests :)
app.listen(port, () => {
  console.log("Your app is listening on port " + port);
});
