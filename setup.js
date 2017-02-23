var colors = require('colors');
var async = require('async');
var pg = require('pg');
var fs = require('fs');

// ENVIRONMENT VARIABLES
var db_host = process.env.DB_HOST || 'localhost';
var db_port = process.env.DB_PORT || 5432;
var db_name = process.env.DB_NAME || 'ethics-app';
var db_user = process.env.DB_USER || 'Nicho';
var db_password = process.env.DB_PW || undefined;
var db_ssl = process.env.DB_SSL || false;


// DATABASE CONFIGURATION
var config = {
    user: db_user,
    password: db_password,
    host: db_host,
    port: db_port,
    database: db_name,
    ssl: JSON.parse(db_ssl)
};
var pool = new pg.Pool(config);

// Load files
var dir = "/sql/schema/";
var queries = [];

// General
queries.push(fs.readFileSync(__dirname + dir + 'reset.sql', 'utf8').toString());
queries.push(fs.readFileSync(__dirname + dir + 'languages.sql', 'utf8').toString());
queries.push(fs.readFileSync(__dirname + dir + 'users.sql', 'utf8').toString());
queries.push(fs.readFileSync(__dirname + dir + 'members.sql', 'utf8').toString());
queries.push(fs.readFileSync(__dirname + dir + 'documents.sql', 'utf8').toString());
queries.push(fs.readFileSync(__dirname + dir + 'revisions.sql', 'utf8').toString());
queries.push(fs.readFileSync(__dirname + dir + 'descriptions.sql', 'utf8').toString());
queries.push(fs.readFileSync(__dirname + dir + 'concerns.sql', 'utf8').toString());
queries.push(fs.readFileSync(__dirname + dir + 'reviews.sql', 'utf8').toString());
queries.push(fs.readFileSync(__dirname + dir + 'examples.sql', 'utf8').toString());


// Start setup
async.waterfall([
    function(callback) {
        // Connect to database
        pool.connect(function(err, client, done) {
            if(err) {
                callback(err);
            } else {
                callback(null, client, done);
            }
        });
    },
    function(client, done, callback) {
        // Run all queries
        async.eachOfSeries(queries, function (query, key, callback) {
            client.query(query, function(err, result) {
                done();
                if (err) {
                    callback(err);
                } else {
                    console.log(colors.blue(query));
                    console.log(colors.green("Done!\n\n"));
                    callback(null);
                }
            });
        }, function(err){
            if (err) {
                callback(err);
            } else {
                callback();
            }
        });
    }
], function(err){
    // Close database connection
    pool.end();

    if(err) {
        console.error(colors.red(err));
    } else {
        console.log(colors.green("Setup successfully done!"));
    }
});
