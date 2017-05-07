var express = require('express');
var router = express.Router();
var isAuthenticated = require('../server.js').isAuthenticated;


var put = require('../controllers/notes/put');


// PUT (ONLY MEMBERS)
router.put('/notes/:note_id', isAuthenticated, put.request);


module.exports = router;
