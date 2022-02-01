const express = require('express');

const router  = express.Router();

const postApi = require("../../../controllers/api/v1/post_api");

router.get('/',postApi.index);
router.get('/:id',postApi.destroy);
module.exports = router;