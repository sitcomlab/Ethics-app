var express = require('express');
var router = express.Router();

var list = require('../controllers/docs/list');
var post = require('../controllers/docs/post');
var get = require('../controllers/docs/get');
var put = require('../controllers/docs/put');
var del = require('../controllers/docs/delete');


// LIST
router.get('/docs/', list.request);


// POST
router.post('/docs/', post.request);


// GET
router.get('/docs/:docId', get.request);


// PUT
router.put('/docs/:docId', put.request);


// DELETE
router.delete('/docs/:docId', del.request);


module.exports = router;
