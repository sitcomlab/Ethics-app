var colors = require('colors');
var async = require('async');
var pg = require('pg');
var fs = require('fs');

// ENVIRONMENT VARIABLES
var postgres_host = process.env.POSTGRES_HOST || 'localhost';
var postgres_port = process.env.POSTGRES_PORT || 5432;
var postgres_db_name = process.env.POSTGRES_DB_NAME || 'ethics-app';
var postgres_username = process.env.POSTGRES_USERNAME || 'Nicho';
var postgres_password = process.env.POSTGRES_PASSWORD || undefined;
var postgres_ssl = process.env.POSTGRES_SSL || false;


// DATABASE CONFIGURATION
var pool = new pg.Pool({
    user: postgres_username,
    password: postgres_password,
    host: postgres_host,
    port: postgres_port,
    database: postgres_db_name,
    ssl: JSON.parse(postgres_ssl)
});

// Load files
var dir = "/sql/schema/";
var queries = [];

// General
queries.push(fs.readFileSync(__dirname + dir + 'reset.sql', 'utf8').toString());
queries.push(fs.readFileSync(__dirname + dir + 'languages.sql', 'utf8').toString());
queries.push(fs.readFileSync(__dirname + dir + 'universities.sql', 'utf8').toString());
queries.push(fs.readFileSync(__dirname + dir + 'institutes.sql', 'utf8').toString());
queries.push(fs.readFileSync(__dirname + dir + 'research_groups.sql', 'utf8').toString());
queries.push(fs.readFileSync(__dirname + dir + 'defaults.sql', 'utf8').toString());
queries.push(fs.readFileSync(__dirname + dir + 'courses.sql', 'utf8').toString());
queries.push(fs.readFileSync(__dirname + dir + 'users.sql', 'utf8').toString());
queries.push(fs.readFileSync(__dirname + dir + 'members.sql', 'utf8').toString());
queries.push(fs.readFileSync(__dirname + dir + 'persons_in_charge.sql', 'utf8').toString());
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
