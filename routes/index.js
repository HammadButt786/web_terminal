var express = require('express');
var router = express.Router();
var Product = require('../models/ProductModel');
var checkSessionAuth = require('../middlewares/checkSessionAuth');

/* GET home page. */
router.get('/',async  function(req, res, next) {
  products = await Product.find();
  res.render('index',{ products });
});
router.get('/add',checkSessionAuth,async  function(req, res, next) {
  res.render('add');
});
router.get('/cart',async  function(req, res, next) {
  cart = req.cookies.cart;
  if(!cart)
  cart = [];
  res.render('cart',{cart});
});
router.get('/cart/:id',async  function(req, res, next) {
  product = await Product.findById(req.params.id);
  let cart = [];
  if(req.cookies.cart) cart =  req.cookies.cart;
  cart.push(product);
  res.cookie('cart',cart);
  res.redirect('/');
});
router.get('/cart/remove/:id',async  function(req, res, next) {
  cart = [];
  if(req.cookies.cart)
  cart = req.cookies.cart;
  cart.splice(cart.findIndex(i=>{
    i._id = req.params.id;
  }),1);
  res.cookie('cart',cart);
  res.redirect('/cart');
});
router.post('/add',async  function(req, res, next) {
  product = new Product(req.body);
  console.log(product);
  await product.save();
  res.redirect('/');
});
module.exports = router;
