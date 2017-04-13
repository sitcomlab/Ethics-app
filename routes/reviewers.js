var express = require('express');
var router = express.Router();
var isAuthenticated = require('../server.js').isAuthenticated;

var get_by_revision = require('../controllers/reviewers/get_by_revision');
var put_by_revision = require('../controllers/reviewers/put_by_revision');


// GET BY REVISION
router.get('/revisions/:revision_id/reviewer', get_by_revision.request);

// EDIT BY REVISION
router.put('/revisions/:revision_id/reviewer', put_by_revision.request);


module.exports = router;
