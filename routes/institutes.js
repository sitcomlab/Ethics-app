var express = require('express');
var router = express.Router();
var isAuthenticated = require('../server.js').isAuthenticated;

var list = require('../controllers/institutes/list');
/*var post = require('../controllers/institutes/post');
var get = require('../controllers/institutes/get');
var put = require('../controllers/institutes/put');
var del = require('../controllers/institutes/delete');*/


// LIST
router.get('/institutes', list.request);

// POST (ONLY MEMBERS)
//router.post('/institutes', isAuthenticated, post.request);

// GET
//router.get('/institutes/:institute_id', get.request);

// PUT (ONLY MEMBERS)
//router.put('/institutes/:institute_id', isAuthenticated, put.request);

// DELETE (ONLY MEMBERS)
//router.delete('/institutes/:institute_id', isAuthenticated, del.request);


module.exports = router;
