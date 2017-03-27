var express = require('express');
var router = express.Router();
var isAuthenticated = require('../server.js').isAuthenticated;

var list = require('../controllers/universities/list');
/*var post = require('../controllers/universities/post');
var get = require('../controllers/universities/get');
var put = require('../controllers/universities/put');
var del = require('../controllers/universities/delete');*/


// LIST
router.get('/universities', list.request);

// POST (ONLY MEMBERS)
//router.post('/universities', isAuthenticated, post.request);

// GET
//router.get('/universities/:university_id', get.request);

// PUT (ONLY MEMBERS)
//router.put('/universities/:university_id', isAuthenticated, put.request);

// DELETE (ONLY MEMBERS)
//router.delete('/universities/:university_id', isAuthenticated, del.request);


module.exports = router;
