var express = require('express');
var router = express.Router();

// var list = require('../controllers/revisions/list');
// var post = require('../controllers/revisions/post');
// var get = require('../controllers/revisions/get');
// var put = require('../controllers/revisions/put');
// var del = require('../controllers/revisions/delete');

var list_by_document = require('../controllers/revisions/list_by_document');


// LIST BY DOCUMENT
router.get('/documents/:document_id/revisions/', list_by_document.request);

// POST
// router.post('/documents/:document_id/revisions/', post.request);

// GET
// router.get('/documents/:document_id/revisions/:revision_id', get.request);

// PUT
// router.put('/documents/:document_id/revisions/:revision_id', put.request);

// DELETE
// router.delete('/documents/:document_id/revisions/:revision_id', del.request);


// LIST
// router.get('/revisions/', list.request);

// POST
// router.post('/revisions/', post.request);

// GET
// router.get('/revisions/:revision_id', get.request);

// PUT
// router.put('/revisions/:revision_id', put.request);

// DELETE
// router.delete('/revisions/:revision_id', del.request);


module.exports = router;
