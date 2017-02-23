var express = require('express');
var router = express.Router();

var member_login = require('../controllers/member_login');
var document_login = require('../controllers/document_login');


// LOGIN
router.post('/login', member_login.request);

// LOGIN BY DOCUMENT-ID
router.get('/login/:document_id', document_login.request);


module.exports = router;
