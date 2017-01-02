var express = require('express');
var router = express.Router();

// var list = require('../controllers/descriptions/list');
var post = require('../controllers/descriptions/post');
// var get = require('../controllers/descriptions/get');
// var put = require('../controllers/descriptions/put');
// var del = require('../controllers/descriptions/delete');

var list_languages_by_revision = require('../controllers/descriptions/list_languages_by_revision');
var list_by_revision = require('../controllers/descriptions/list_by_revision');


// LIST LANGUAGES
router.get('/documents/:document_id/revisions/:revision_id/languages', list_languages_by_revision.request);

// LIST BY REVISION
router.get('/documents/:document_id/revisions/:revision_id/:language/descriptions', list_by_revision.request);


// POST
router.post('/documents/:document_id/revisions/:revision_id/:language/descriptions', post.request);

// GET
// router.get('/documents/:document_id/revisions/:revision_id/descriptions/:description_id', get.request);

// PUT
// router.put('/documents/:document_id/revisions/:revision_id/descriptions/:description_id', put.request);

// DELETE
// router.delete('/documents/:document_id/revisions/:revision_id/descriptions/:description_id', del.request);


// LIST
// router.get('/revisions/:revision_id/descriptions/', list.request);

// POST
// router.post('/revisions/:revision_id/descriptions/', post.request);

// GET
// router.get('/revisions/:revision_id/descriptions/:description_id', get.request);

// PUT
// router.put('/revisions/:revision_id/descriptions/:description_id', put.request);

// DELETE
// router.delete('/revisions/:revision_id/descriptions/:description_id', del.request);


// LIST
// router.get('/descriptions/', list.request);

// POST
// router.post('/descriptions/', post.request);

// GET
// router.get('/descriptions/:description_id', get.request);

// PUT
// router.put('/descriptions/:description_id', put.request);

// DELETE
// router.delete('/descriptions/:description_id', del.request);


module.exports = router;
