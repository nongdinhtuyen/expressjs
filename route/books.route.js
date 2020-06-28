var express = require('express')
var router = express.Router()
const shortid = require('shortid')
var db = require("../db")

router.get("/", (req, res) => {
  res.render("books/list", {
    books: db.get("books").value()
  })
})

router.get("/create", (req, res) =>{
  res.render("books/create", {
    books: db.get('books').value()
  })
})

router.post("/create", (req, res) =>{
  req.body.id = shortid.generate()
  db.get('books').push(req.body).write();
  res.redirect("/index/books");
})

router.get("/search", (req, res) =>{
  var q = req.query.q;
  var question;
  var search = db.get('books').value().filter(book => {
    return book.title.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  })
  res.render('books/list', {
    books: search,
    question: q
  })
})

router.get("/:title", (req, res) =>{
  var title = req.params.title;
  var name = db.get('books').find({title: title}).value()
  res.render("books/view", {
    books: name
  })
})

router.get("/:title/update", (req, res) =>{
  var title = req.params.title
  
  var name = db.get('books').find({title: title}).value()
  res.render('books/update', {
    books: name
  })

})

router.post('/:title/update', (req, res) =>{
  var title= req.params.title
  var description = req.body.description
  var Title1 = req.body.title
  db.get('books').find({ title: title }).assign({ title: Title1}).assign({ description: description}).write();
  res.redirect("/index/books");
  console.log(db.get("books").value())
})

router.get('/:id/delete', (req, res) =>{
  db.get('books').remove({id: req.params.id}).write()
  res.redirect('/index/books')
})



module.exports = router