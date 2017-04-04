var express = require('express');
var router = express.Router();
var isAuthenticated = require('../server.js').isAuthenticated;

var list_active = require('../controllers/members/list_active');
var list_all = require('../controllers/members/list_all');
var post = require('../controllers/members/post');
var get = require('../controllers/members/get');
var put = require('../controllers/members/put');
var del = require('../controllers/members/delete');


// LIST
router.get('/members/active', isAuthenticated, list_active.request);

// LIST (ONLY MEMBERS)
router.get('/members/all', isAuthenticated, list_all.request);

// POST (ONLY MEMBERS)
router.post('/members', isAuthenticated, post.request);

// GET
router.get('/members/:member_id', isAuthenticated, get.request);

// PUT (ONLY MEMBERS)
router.put('/members/:member_id', isAuthenticated, put.request);

// DELETE (ONLY MEMBERS)
router.delete('/members/:member_id', isAuthenticated, del.request);


module.exports = router;
