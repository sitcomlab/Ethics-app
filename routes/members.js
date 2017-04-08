var express = require('express');
var router = express.Router();
var isAuthenticated = require('../server.js').isAuthenticated;

var list = require('../controllers/members/list');
var post = require('../controllers/members/post');
var get = require('../controllers/members/get');
var put = require('../controllers/members/put');
var del = require('../controllers/members/delete');


// LIST (PUBLIC AND MEMBERS)
router.get('/members', isAuthenticated, list.request);

// POST (ONLY MEMBERS)
router.post('/members', isAuthenticated, post.request);

// GET
router.get('/members/:member_id', isAuthenticated, get.request);

// PUT (ONLY MEMBERS)
router.put('/members/:member_id', isAuthenticated, put.request);

// DELETE (ONLY MEMBERS)
router.delete('/members/:member_id', isAuthenticated, del.request);


module.exports = router;
