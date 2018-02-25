var express = require('express');
var router = express.Router();
var isAuthenticated = require('../server.js').isAuthenticated;
var filetype = require('file-type')
var path = require('path')

// File Upload
var multer = require('multer');
var store_file = require('../controllers/concerns/upload_file');
var upload = multer({
    dest: '/home/specki/Desktop/',
    fileFilter: function (req, file, cb) {

        var filetypes = /pdf|zip/;
        var mimetype = filetypes.test(file.mimetype);
        var extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
          return cb(null, true);
        }
        cb("Error: File upload only supports the following filetypes - " + filetypes);
      }
})

// UPLOAD FILES
router.post('/:concern_id', isAuthenticated, upload.single("filename"), store_file.upload)

module.exports = router;