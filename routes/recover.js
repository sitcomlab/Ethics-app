var express = require('express');
var router = express.Router();

var list = require('../controllers/recover/list');


// LIST
router.get('/recover/:email_address', list.request);


module.exports = router;
