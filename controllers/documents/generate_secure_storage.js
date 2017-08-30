var pool = require('../../server.js').pool;
var async = require('async');
var keepass = require('keepass.io');
var colors = require('colors');
var crypto = require('crypto');
var config = require ('../../.securestorage.json');

var fs = require("fs");
var dir_2 = "/../../sql/queries/documents/";
var query_set_secure_storage_password_flag = fs.readFileSync(__dirname + dir_2 + 'set_hasSecureStoragePassword.sql', 'utf8').toString();

module.exports.createSS = function(req, res, document_id, callback) {   
    async.waterfall([
        function(callback){
            // Connect to database
            pool.connect(function(err, client, done) {
                if(err) {
                    callback(err, null);
                } else {
                    callback(null, client, done);
                }
            });
        },
        function(client, done, callback) {
            // Set flag 
            client.query(query_set_secure_storage_password_flag, [
              document_id
            ], function(err, result) {
                done();
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, client, done);
                }
            });
        },
        function(client, done, callback){
        // Open Keepass DB
            var db = new keepass.Database();
            db.addCredential(new keepass.Credentials.Password(config.DBPASSWORD));
            db.addCredential(new keepass.Credentials.Keyfile(config.DBKEYFILE));
            db.loadFile(config.DBPATH + config.DBNAME, function(err) {
                if(err) callback(err, null);
                var rawDatabase = db.getRawApi().get();
                
                // create distinguishable password
                var psw = crypto.randomBytes(config.PASSWORD_LENGTH)
                            .toString('base64')
                            .replace("1","R")
                            .replace("I","A")
                            .replace("0","M")
                            .replace("O","P")
                            .replace("U","F")
                            .replace("V","Z")
                            .replace("Q","X");

                // Add new Entry
                rawDatabase.KeePassFile.Root.Group.Entry.push(
                    {"String":[{"Key":"Password","Value":{"_":psw,"$":{"Protected":"True"}}},{"Key":"Title","Value":document_id}]}              
                );
                // Write to Database
                db.getRawApi().set(rawDatabase);
                db.saveFile(config.DBPATH + config.DBNAME, function(err) {
                    if(err) callback(err, null);
                });
                callback(null, psw);
            });
        }
        ], function(err, password) {
        if(err){
            console.error(colors.red(err));
            callback(err,null)
        } else {
            callback(null, password);
        }
    });
};