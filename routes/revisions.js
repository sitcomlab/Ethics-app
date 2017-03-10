var express = require('express');
var router = express.Router();
var isAuthenticated = require('../server.js').isAuthenticated;

var list_by_document = require('../controllers/revisions/list_by_document');


// LIST BY DOCUMENT
router.get('/documents/:document_id/revisions/', list_by_document.request);


module.exports = router;
