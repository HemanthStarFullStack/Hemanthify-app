const express = require('express');

const router = express.Router()

const address =require('../controllers/post_controller');


router.get('/post_data',address.posts);

module.exports= router;