var express = require('express')
var router = express.Router()
var bookRoute = require('./books.route');
var userRoute = require('./users.route');
const shortid = require('shortid')

var db = require("../db")

router.get("/", (req, res) =>{
  res.render('transactions/list', {
    transactions: db.get('transactions').value(),
  })
})

router.get("/create", (req, res) =>{
  res.render('transactions/create', {
    users: db.get('users').value(),
    books: db.get('books').value()
  })
})

router.post("/create", (req, res) =>{
  req.body.id= shortid.generate()
  db.get('transactions').push(req.body).write()
  res.redirect('/index/transactions')
})

router.get("/:id/delete", (req, res) =>{
  db.get('transactions').remove({id: req.params.id}).write()
  res.redirect('/index/transactions')
})

module.exports = router