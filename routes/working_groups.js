var express = require('express');
var router = express.Router();
var isAuthenticated = require('../server.js').isAuthenticated;

var list = require('../controllers/working_groups/list');
var list_by_institute = require('../controllers/working_groups/list_by_institute');
var post = require('../controllers/working_groups/post');
var get = require('../controllers/working_groups/get');
var put = require('../controllers/working_groups/put');
var del = require('../controllers/working_groups/delete');


// LIST
router.get('/working_groups', list.request);

// LIST BY INSTITUTE
router.get('/institutes/:institute_id/working_groups', list_by_institute.request);

// POST (ONLY ADMINS)
router.post('/working_groups', isAuthenticated, post.request);

// GET
router.get('/working_groups/:working_group_id', get.request);

// PUT (ONLY ADMINS)
router.put('/working_groups/:working_group_id', isAuthenticated, put.request);

// DELETE (ONLY ADMINS)
router.delete('/working_groups/:working_group_id', isAuthenticated, del.request);


module.exports = router;
