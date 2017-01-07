var express = require('express');
var router = express.Router();

var post = require('../controllers/users/post');
var get = require('../controllers/users/get');
var put = require('../controllers/users/put');
var find_by_email = require('../controllers/users/find_by_email');


// POST
router.post('/users', post.request);

// GET
router.get('/users/:user_id', get.request);

// PUT
router.put('/users/:user_id', put.request);

// FIND BY EMAIL
router.get('/user/:email_address', find_by_email.request);


module.exports = router;
