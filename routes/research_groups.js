var express = require('express');
var router = express.Router();
var isAuthenticated = require('../server.js').isAuthenticated;

var list = require('../controllers/research_groups/list');
var post = require('../controllers/research_groups/post');
var get = require('../controllers/research_groups/get');
var put = require('../controllers/research_groups/put');
var del = require('../controllers/research_groups/delete');


// LIST
router.get('/research_groups', list.request);

// POST (ONLY MEMBERS)
router.post('/research_groups', isAuthenticated, post.request);

// GET
router.get('/research_groups/:research_group_id', get.request);

// PUT (ONLY MEMBERS)
router.put('/research_groups/:research_group_id', isAuthenticated, put.request);

// DELETE (ONLY MEMBERS)
router.delete('/research_groups/:research_group_id', isAuthenticated, del.request);


module.exports = router;
