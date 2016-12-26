var express = require('express');
var router = express.Router();

// var list = require('../controllers/users/list');
var post = require('../controllers/users/post');
var get = require('../controllers/users/get');
var put = require('../controllers/users/put');
// var del = require('../controllers/users/delete');

var find_by_email = require('../controllers/users/find_by_email');


// LIST
// router.get('/users', list.request);

// POST
router.post('/users', post.request);

// GET
router.get('/users/:user_id', get.request);

// PUT
router.put('/users/:user_id', put.request);

// DELETE
// router.delete('/users/:user_id', del.request);


// FIND BY EMAIL
router.get('/user/:email_address', find_by_email.request);


module.exports = router;
