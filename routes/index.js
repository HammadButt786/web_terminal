var express = require('express');
var router = express.Router();
var Product = require('../models/ProductModel');


/* GET home page. */
router.get('/',async  function(req, res, next) {
  products = await Product.find();
  // console.log(products);
  res.render('index',{ products });
});
router.get('/add',async  function(req, res, next) {
  res.render('add');
});

module.exports = router;
