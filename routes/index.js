const express = require('express');

const router  = express.Router();
const homeController = require("../controllers/home_Controller");

router.get('/',homeController.home);
router.use('/users',require('./users'));
router.use('/post',require('./post'));
router.use('/comments',require('./comment'));
router.use('/api', require("./api"));
 
//main route file(access every route from here)
// console.log('at users');
 

module.exports = router;

