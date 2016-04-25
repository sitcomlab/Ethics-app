var express = require('express');
var router = express.Router();

var list = require('../controllers/members/list');
var post = require('../controllers/members/post');
var get = require('../controllers/members/get');
var put = require('../controllers/members/put');
var del = require('../controllers/members/delete');


// LIST
router.get('/members', list.request);


// POST
router.post('/members', post.request);


// GET
router.get('/members/:member_id', get.request);


// PUT
router.put('/members/:member_id', put.request);


// DELETE
router.delete('/members/:member_id', del.request);


module.exports = router;
