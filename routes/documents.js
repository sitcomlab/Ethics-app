var express = require('express');
var router = express.Router();

// var list = require('../controllers/documents/list');
var post = require('../controllers/documents/post');
var get = require('../controllers/documents/get');
var put = require('../controllers/documents/put');
// var del = require('../controllers/documents/delete');

var confirm_intro = require('../controllers/documents/confirm_intro');
var submit = require('../controllers/documents/submit');


// LIST
// router.get('/documents', list.request);

// POST
router.post('/users/:user_id/documents', post.request);

// GET
router.get('/documents/:document_id', get.request);

// PUT
router.put('/documents/:document_id', put.request);

// DELETE
// router.delete('/documents/:document_id', del.request);


// CONFIRM INTRO
router.get('/documents/:document_id/intro', confirm_intro.request);

// SUBMIT INTRO
router.get('/documents/:document_id/submit', submit.request);


module.exports = router;
