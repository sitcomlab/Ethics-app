var express = require('express');
var router = express.Router();

var list = require('../controllers/docs/list');
var post = require('../controllers/docs/post');
var get = require('../controllers/docs/get');
var put = require('../controllers/docs/put');
var del = require('../controllers/docs/delete');
var sub = require('../controllers/docs/submit');


// LIST
router.get('/docs', list.request);


// POST
router.post('/docs', post.request);


// GET
router.get('/docs/:doc_id', get.request);


// PUT
router.put('/docs/:doc_id', put.request);


// DELETE
router.delete('/docs/:doc_id', del.request);


// SUBMIT
router.get('/docs/:doc_id/submit', sub.request);


module.exports = router;
