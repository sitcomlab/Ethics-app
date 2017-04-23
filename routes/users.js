var express = require('express');
var router = express.Router();
var isAuthenticated = require('../server.js').isAuthenticated;

var list = require('../controllers/users/list');
var list_by_institute = require('../controllers/users/list_by_institute');
var post = require('../controllers/users/post');
var get = require('../controllers/users/get');
var put = require('../controllers/users/put');
var del = require('../controllers/users/delete');
var find_by_email = require('../controllers/users/find_by_email');


// LIST (ONLY FOR MEMBERS)
router.get('/users', isAuthenticated, list.request);

// LIST (ONLY FOR MEMBERS)
router.get('/institutes/:institute_id/users', isAuthenticated, list_by_institute.request);

// POST
router.post('/users', post.request);

// GET
router.get('/users/:user_id', isAuthenticated, get.request);

// PUT
router.put('/users/:user_id', isAuthenticated, put.request);

// DELETE (ONLY FOR MEMBERS)
router.delete('/users/:user_id', isAuthenticated, del.request);

// FIND BY EMAIL
router.get('/user/:email_address', find_by_email.request);


module.exports = router;
