const express = require('express');
 const router  = express.Router();
const likesCon  = require("../controllers/likesController");
router.post('/toggle', likesCon.toggleLiker);
module.exports = router;
