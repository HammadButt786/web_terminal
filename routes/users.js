var express = require('express');
var router = express.Router();
const Users = require("../models/UsersModel");

/* GET users listing. */
router.get('/signup',async function(req, res, next) {
  // console.log(req.Session.user);
  res.render('signup');
});
router.get('/login',async function(req, res, next) {
  res.render('login');
});
router.get('/logout',async function(req, res, next) {
  delete req.session.user;
  console.log(req.session);
  res.redirect('/');
});
router.post('/login',async function(req, res, next) {
  let user = await Users.findOne({
    email: req.body.email,
    password : req.body.password
  });
  if(!user)    res.redirect('/users/login');
  req.session.user = user;
  res.redirect('/');
});
router.post('/signup',async function(req, res, next) {
  user = new Users(req.body);
  await user.save();
  res.redirect('/users/login');
});

module.exports = router;
