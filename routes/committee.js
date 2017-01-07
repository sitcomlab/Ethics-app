var express = require('express');
var router = express.Router();

var list = require('../controllers/committee/list');
// var post = require('../controllers/committee/post');
// var get = require('../controllers/committee/get');
// var put = require('../controllers/committee/put');
// var del = require('../controllers/committee/delete');



// LIST
router.get('/committee', list.request);

// POST
// router.post('/committee', post.request);

// GET
// router.get('/committee/:committee_id', get.request);

// PUT
// router.put('/committee/:committee_id', put.request);

// DELETE
// router.delete('/committee/:committee_id', del.request);


module.exports = router;
