var express = require('express')
var router = express.Router()

const shortid = require('shortid')

var db = require('../db')

router.get("/", (req, res) => {
  res.render("works/milos", {
    works: db.get('works').value()
  });
  console.log(db.get('works').value())
});

router.get("/search", (req, res) => {
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

router.get("/create", (req, res) => {
  res.render('works/create');
});

router.post("/create", (req, res) => {
  req.body.id = shortid.generate()
  db.get("works").push(req.body).write();
  res.redirect("/todos");
});

router.get("/:id", (req, res) => {
  var id = req.params.id;
  var work = db.get('works').find({ id: id }).value();
  res.render("works/view" ,  {
    works: work
  });
  console.log(db.get('works').value())
});

router.get("/:id/delete", (req, res) =>{
  var id = req.params.id;
  var work = db.get('works').find({ id: id }).value();
  res.render('works/delete', {
    works: work
  })
  console.log(db.get('works').find({ id: req.params.id }).value())
})

router.post("/:id/delete", (req, res) => {
  var id = req.params.id;
  console.log(id)
  var work = db.get('works').find({ id: id }).value();
  db.get('works').remove({id: id}).write();
  res.redirect("/todos");
  console.log(db.get('works').value())
})


module.exports = router