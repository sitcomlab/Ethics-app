var express = require('express');
var router = express.Router();

var pdf = require('../config/pdf');


// LIST
router.post('/pdf', pdf.generate);


module.exports = router;
