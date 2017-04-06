var express = require('express');
var router = express.Router();
var isAuthenticated = require('../server.js').isAuthenticated;

// TODO: var put = require('../controllers/reviews/put');
var get_by_revision = require('../controllers/reviews/get_by_revision');


// GET BY REVISION
router.get('/revisions/:revision_id/review', get_by_revision.request);

// PUT (ONLY MEMBERS)
// TODO: router.put('/reviews/:review_id', put.request);


module.exports = router;
