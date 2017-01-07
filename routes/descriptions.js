var express = require('express');
var router = express.Router();

var put = require('../controllers/descriptions/put');
var get_by_revision = require('../controllers/descriptions/get_by_revision');


// GET BY REVISION
router.get('/revisions/:revision_id/:language/description', get_by_revision.request);

// PUT
router.put('/descriptions/:description_id', put.request);


module.exports = router;
