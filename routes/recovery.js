var express = require('express');
var router = express.Router();

var find_by_email = require('../controllers/recovery/find_by_email');



// FIND BY EMAIL
router.get('/recovery/:email_address', find_by_email.request);


module.exports = router;
