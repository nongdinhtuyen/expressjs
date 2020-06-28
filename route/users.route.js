var express = require('express')
var router = express.Router()
const shortid = require('shortid')
var db = require("../db")

router.get("/", (req, res) => {
  res.render("users/list", {
    users: db.get("users").value()
  })
})

router.get('/create', (req, res) =>{
  res.render("users/create", {
    users: db.get('users').value()
  })
})

router.post("/create", (req, res) =>{
  req.body.id= shortid.generate();
  db.get('users').push(req.body).write();
  res.redirect('/index/users')
})

router.get("/search", (req, res) =>{
  console.log(db.get('users').value())
  var q = req.query.q
  var question 
  var search = db.get('users').value().filter(user =>{
    return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  })
  res.render('users/list', {
    users: search,
    question: q
  })
})

router.get("/:id", (req, res) =>{
  var id = req.params.id;
  var name = db.get('users').find({id: id}).value()
  res.render("users/view", {
    users: name
  })
})

router.get('/:id/delete', (req, res) =>{
  db.get('users').remove({id: req.params.id}).write()
  res.redirect('/index/users')
})


module.exports = router