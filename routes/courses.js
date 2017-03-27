var express = require('express');
var router = express.Router();
var isAuthenticated = require('../server.js').isAuthenticated;

var list = require('../controllers/courses/list');
/*var post = require('../controllers/courses/post');
var get = require('../controllers/courses/get');
var put = require('../controllers/courses/put');
var del = require('../controllers/courses/delete');*/


// LIST
router.get('/courses', list.request);

// POST (ONLY MEMBERS)
//router.post('/courses', isAuthenticated, post.request);

// GET
//router.get('/courses/:course_id', get.request);

// PUT (ONLY MEMBERS)
//router.put('/courses/:course_id', isAuthenticated, put.request);

// DELETE (ONLY MEMBERS)
//router.delete('/courses/:course_id', isAuthenticated, del.request);


module.exports = router;
