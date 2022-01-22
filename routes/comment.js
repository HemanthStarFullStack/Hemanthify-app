const express = require('express');

const router  = express.Router();

const passport = require("passport");

const comment_controller = require('../controllers/comment_Controller');

router.post('/update',passport.checkAuthentication,comment_controller.comment_section);
router.get('/deleteComment/',passport.checkAuthentication,comment_controller.commentDeletion);
module.exports = router;