const express = require('express');

const router = express.Router();

const passport = require("../config/passport-local")

const address =require('../controllers/post_controller');


router.post('/post_data',passport.checkAuthentication,address.posts);

router.get('/delete_post',passport.checkAuthentication,address.destroy);
module.exports= router; 