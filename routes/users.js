var express = require('express');
var router = express.Router();
const Users = require("../models/UsersModel");
/* GET users listing. */
router.get('/',async function(req, res, next) {
  res.send('respond with a resource');
  users =await Users.find();
  console.log(users);
});

module.exports = router;
