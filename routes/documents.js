var express = require('express');
var router = express.Router();

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
router.get('/documents', list_all.request);

// LIST ALL FROM USER (ONLY MEMBERS)
router.get('/users/:user_id/documents', list_by_user.request);

// POST
router.post('/documents', post.request);

// GET
router.get('/documents/:document_id', get.request);

// PUT
router.put('/documents/:document_id', put.request);

// DELETE
router.delete('/documents/:document_id', del.request);

// CONFIRM INTRO
router.get('/documents/:document_id/intro', confirm_intro.request);

// SUBMIT DOCUMENT
router.get('/documents/:document_id/submit', submit.request);

// GENERATE FILES
router.get('/documents/:document_id/files', generate_files.request);


module.exports = router;
