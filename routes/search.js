var express = require('express');
var router = express.Router();
var isAuthenticated = require('../server.js').isAuthenticated;

var search_documents = require('../controllers/documents/search');
//var search_documents_by_user = require('../controllers/documents/search_by_user');
//var search_documents_by_course = require('../controllers/documents/search_by_course');


// SEARCH ALL DOCUMENTS (ONLY MEMBERS)
router.post('/search/documents', isAuthenticated, search_documents.request);

// SEARCH ALL DOCUMENTS BY USER (ONLY MEMBERS)
//router.post('/search/users/:user_id/documents', isAuthenticated, search_documents_by_user.request);

// SEARCH ALL DOCUMENTS BY COURSE (ONLY MEMBERS)
//router.post('/search/courses/:course_id/documents', isAuthenticated, search_documents_by_course.request);


module.exports = router;
