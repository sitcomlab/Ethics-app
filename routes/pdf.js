var express = require('express');
var router = express.Router();

var pdf = require('../config/pdf');


// LIST
router.post('/pdf/:doc_id', pdf.generate);


module.exports = router;
