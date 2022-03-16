const express = require('express');

const router  = express.Router();

const chatCon = require('../controllers/chat_box_controller');
router.post('/chatroom',chatCon.customChatRoom);
module.exports = router;