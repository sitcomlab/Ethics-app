var express = require('express');
var router = express.Router();
var isAuthenticated = require('../server.js').isAuthenticated;

var list_all = require('../controllers/documents/list_all');
var list_by_user = require('../controllers/documents/list_by_user');
var post = require('../controllers/documents/post');
var get = require('../controllers/documents/get');
var put = require('../controllers/documents/put');
var del = require('../controllers/documents/delete');
var confirm_intro = require('../controllers/documents/confirm_intro');
var submit = require('../controllers/documents/submit');
var generate_files = require('../controllers/documents/generate_files');


// LIST ALL (ONLY MEMBERS)
router.get('/documents', isAuthenticated, list_all.request);

// LIST ALL FROM USER (ONLY MEMBERS)
router.get('/users/:user_id/documents', isAuthenticated, list_by_user.request);

// POST
router.post('/documents', post.request);

// GET
router.get('/documents/:document_id', isAuthenticated, get.request);

// PUT
router.put('/documents/:document_id', isAuthenticated, put.request);

// DELETE
router.delete('/documents/:document_id', isAuthenticated, del.request);

// CONFIRM INTRO
router.get('/documents/:document_id/intro', isAuthenticated, confirm_intro.request);

// SUBMIT DOCUMENT
router.get('/documents/:document_id/submit', isAuthenticated, submit.request);

// GENERATE FILES
router.get('/documents/:document_id/files', isAuthenticated, generate_files.request);


module.exports = router;
