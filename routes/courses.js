var express = require('express');
var router = express.Router();
var isAuthenticated = require('../server.js').isAuthenticated;

var list = require('../controllers/courses/list');
var list_by_institute = require('../controllers/courses/list_by_institute');
var post = require('../controllers/courses/post');
var get = require('../controllers/courses/get');
var get_by_document = require('../controllers/courses/get_by_document');
var put = require('../controllers/courses/put');
var del = require('../controllers/courses/delete');


// LIST
router.get('/courses', list.request);

// LIST BY INSTITUTE
router.get('/institutes/:institute_id/courses', list_by_institute.request);

// POST (ONLY MEMBERS)
router.post('/courses', isAuthenticated, post.request);

// GET
router.get('/courses/:course_id', get.request);

// GET BY DOCUMENT
router.get('/documents/:document_id/course', get_by_document.request);

// PUT (ONLY MEMBERS)
router.put('/courses/:course_id', isAuthenticated, put.request);

// DELETE (ONLY MEMBERS)
router.delete('/courses/:course_id', isAuthenticated, del.request);


module.exports = router;
