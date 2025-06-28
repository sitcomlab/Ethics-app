var colors = require('colors');
var async = require('async');
var pg = require('pg');
var fs = require('fs');
require('dotenv').config();

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
var dir = "/sql/migration/";
var queries = [];


var query = fs.readFileSync(__dirname + dir + 'migrate_141_to_142.sql', 'utf8').toString();

// Start migration
async.waterfall([
    function(callback) {
        pool.connect(function(err, client, done) {
            if (err) {
                callback(err);
            } else {
                callback(null, client, done);
            }
        });
    },
    function(client, done, callback) {
        client.query(query, function(err, result) {
            done();
            if (err) {
                callback(err);
            } else {
                console.log(colors.blue(query));
                console.log(colors.green("Migration to 1.4.2 complete!\n"));
                callback(null);
            }
        });
    }
], function(err) {
    pool.end();
    if (err) {
        console.error(colors.red("Migration failed:"));
        console.error(colors.red(err));
    } else {
        console.log(colors.green("Migration script finished successfully."));
    }
});