var express = require('express');
var router = express.Router();
var isAuthenticated = require('../server.js').isAuthenticated;

var list = require('../controllers/members/list');
var list_by_course = require('../controllers/members/list_by_course');
var post = require('../controllers/members/post');
var get = require('../controllers/members/get');
var put = require('../controllers/members/put');
var del = require('../controllers/members/delete');


// LIST (PUBLIC AND MEMBERS)
router.get('/members', isAuthenticated, list.request);

// LIST BY COURSE (PUBLIC AND MEMBERS)
router.get('/courses/:course_id/members', isAuthenticated, list_by_course.request);

// POST (ONLY ADMINS)
router.post('/members', isAuthenticated, post.request);

// GET
router.get('/members/:member_id', isAuthenticated, get.request);

// PUT (MEMBERS AND ADMINS)
router.put('/members/:member_id', isAuthenticated, put.request);

// DELETE (ONLY ADMINS)
router.delete('/members/:member_id', isAuthenticated, del.request);


module.exports = router;
