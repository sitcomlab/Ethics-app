var express = require('express');
var router = express.Router();

var find_user_by_email = require('../controllers/recovery/find_user_by_email');
var find_member_by_email = require('../controllers/recovery/find_member_by_email');
// TODO: var reset_password = require('../controllers/recovery/reset_password');


// FIND USER BY EMAIL
router.get('/recovery/user/:email_address', find_user_by_email.request);

// FIND MEMBER BY EMAIL (ONLY MEMBERS)
router.get('/recovery/member/:email_address', find_member_by_email.request);

// RESET PASSWORD (ONLY MEMBERS)
// TODO: router.post('/reset', reset_password.request);


module.exports = router;
