var express = require('express');
var router = express.Router();
var isAuthenticated = require('../server.js').isAuthenticated;

var put = require('../controllers/concerns/put');
var get_by_revision = require('../controllers/concerns/get_by_revision');


// GET BY REVISION
router.get('/revisions/:revision_id/concerns', isAuthenticated, get_by_revision.request);

// PUT
router.put('/concerns/:concern_id', isAuthenticated, put.request);


module.exports = router;
