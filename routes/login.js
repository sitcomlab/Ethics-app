var express = require('express');
var router = express.Router();

var member_login = require('../controllers/member_login');
var user_login = require('../controllers/user_login');


// LOGIN BY EMAIL-ADDRESS & PASSWORD (MEMBER-CLIENT)
router.post('/login', member_login.request);

// LOGIN BY DOCUMENT-ID (USER-CLIENT)
router.get('/login/:document_id', user_login.request);


module.exports = router;
