var express = require('express');
var router = express.Router();
var isAuthenticated = require('../server.js').isAuthenticated;

var export_review = require('../controllers/export_review');

// GET BY REVISION
router.get('/exports/:document_id', isAuthenticated, export_review.request);

module.exports = router;