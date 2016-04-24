var express = require('express');
var router = express.Router();

var list = require('../controllers/reset/list');


// LIST
router.get('/reset/:email', list.request);


module.exports = router;
