var colors = require('colors');
var async = require('async');
var pg = require('pg');
var fs = require('fs');
var config = require('dotenv').config();


// DATABASE CONFIGURATION
var pool = new pg.Pool({
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    database: process.env.POSTGRES_DB_NAME,
    user: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    ssl: JSON.parse(process.env.POSTGRES_SSL)
});
exports.pool = pool;

// Load files
var dir = "/sql/schema/";
var queries = [];

// General
queries.push(fs.readFileSync(__dirname + dir + 'reset.sql', 'utf8').toString());
queries.push(fs.readFileSync(__dirname + dir + 'universities.sql', 'utf8').toString());
queries.push(fs.readFileSync(__dirname + dir + 'institutes.sql', 'utf8').toString());
queries.push(fs.readFileSync(__dirname + dir + 'working_groups.sql', 'utf8').toString());
queries.push(fs.readFileSync(__dirname + dir + 'courses.sql', 'utf8').toString());
queries.push(fs.readFileSync(__dirname + dir + 'users.sql', 'utf8').toString());
queries.push(fs.readFileSync(__dirname + dir + 'members.sql', 'utf8').toString());
queries.push(fs.readFileSync(__dirname + dir + 'responsibilities.sql', 'utf8').toString());
queries.push(fs.readFileSync(__dirname + dir + 'documents.sql', 'utf8').toString());
queries.push(fs.readFileSync(__dirname + dir + 'affiliations.sql', 'utf8').toString());
queries.push(fs.readFileSync(__dirname + dir + 'revisions.sql', 'utf8').toString());
queries.push(fs.readFileSync(__dirname + dir + 'descriptions.sql', 'utf8').toString());
queries.push(fs.readFileSync(__dirname + dir + 'concerns.sql', 'utf8').toString());
queries.push(fs.readFileSync(__dirname + dir + 'comments.sql', 'utf8').toString());
queries.push(fs.readFileSync(__dirname + dir + 'notes.sql', 'utf8').toString());
queries.push(fs.readFileSync(__dirname + dir + 'reviewers.sql', 'utf8').toString());
if(JSON.parse(process.env.DEFAULTS)){
    queries.push(fs.readFileSync(__dirname + dir + 'defaults.sql', 'utf8').toString());
}
if(JSON.parse(process.env.EXAMPLES)){
    queries.push(fs.readFileSync(__dirname + dir + 'examples.sql', 'utf8').toString());
}


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
