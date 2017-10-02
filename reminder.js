var async = require('async');
var colors = require('colors');
var fs = require('fs');
var pg = require('pg');
var nodemailer = require('nodemailer');
var mustache = require('mustache');
var moment = require('moment');
var jwt = require('jsonwebtoken');
var config = require('dotenv').config();
var domain = process.env.SERVER_URL + ":" + process.env.SERVER_PORT;
var member_client_path = process.env.MEMBER_CLIENT_PATH;


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


if(Number(process.env.REMIND_UNTIL) > 0 && Number(process.env.REMIND_UNTIL) > Number(process.env.REMIND_AFTER)){
    console.log(colors.green(new Date() + " Reminder (after " + process.env.REMIND_AFTER + " until " + process.env.REMIND_UNTIL + " days) has started"));
} else {
    console.log(colors.green(new Date() + " Reminder (after " + process.env.REMIND_AFTER + " days) has started"));
}


// Check database connection
pool.connect(function(err, client, done) {
    if(err) {
        console.error(err);
        console.error(colors.red(new Date() + " Could not connect to Database! Invalid Credentials or Postgres is not running"));
    } else {
        client.query("SELECT true;", function(err, result) {
            done();
            if (err) {
                console.error(colors.red(JSON.stringify(err)));
            } else {
                console.log(colors.green(new Date() + " Postgres is running on port " + process.env.POSTGRES_PORT));
            }
        });
    }
});

pool.on('error', function (err, client) {
    console.error('idle client error', err.message, err.stack);
});


// SMTP CONFIGURATION
var transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: JSON.parse(process.env.SMTP_SSL),
    auth: {
        user: process.env.SMTP_EMAIL_ADDRESS,
        pass: process.env.SMTP_PASSWORD
    }
});


// SQL files
var dir_1 = "/templates/emails/";
var dir_2 = "/sql/queries/documents/";
var dir_3 = "/sql/queries/courses/";
var dir_4 = "/sql/queries/revisions/";
var dir_5 = "/sql/queries/descriptions/";
var dir_6 = "/sql/queries/concerns/";
var dir_7 = "/sql/queries/users/";
var dir_8 = "/sql/queries/members/";

var template_member_review_reminder = fs.readFileSync(__dirname + dir_1 + 'member_review_reminder.html', 'utf8').toString();
var query_list_documents_by_status = fs.readFileSync(__dirname + dir_2 + 'list_by_status.sql', 'utf8').toString();
var query_list_documents_by_status_interval = fs.readFileSync(__dirname + dir_2 + 'list_by_status_interval.sql', 'utf8').toString();
var query_get_course_by_document = fs.readFileSync(__dirname + dir_3 + 'get_by_document.sql', 'utf8').toString();
var query_get_latest_revision_by_document = fs.readFileSync(__dirname + dir_4 + 'get_latest_by_document.sql', 'utf8').toString();
var query_get_description_by_revision = fs.readFileSync(__dirname + dir_5 + 'get_by_revision.sql', 'utf8').toString();
var query_get_concern_by_revision = fs.readFileSync(__dirname + dir_6 + 'get_by_revision.sql', 'utf8').toString();
var query_get_user = fs.readFileSync(__dirname + dir_7 + 'get.sql', 'utf8').toString();
var query_list_members_by_course = fs.readFileSync(__dirname + dir_8 + 'list_by_course_internal.sql', 'utf8').toString();
var query_list_members_by_subscription_filter_by_institute = fs.readFileSync(__dirname + dir_8 + 'list_by_subscription_filter_by_institute.sql', 'utf8').toString();


// Start
async.waterfall([
    function(callback){
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
        var query = query_list_documents_by_status;
        var params = [
            null,
            null,
            'title.asc',
            Number(process.env.REMIND_AFTER)
        ];

        // Check if interval was defined
        if(Number(process.env.REMIND_UNTIL) > 0 && Number(process.env.REMIND_UNTIL) > Number(process.env.REMIND_AFTER)){
            var query = query_list_documents_by_status_interval;
            params.push(Number(process.env.REMIND_UNTIL));
        }

        callback(null, client, done, query, params);
    },
    function(client, done, query, params, callback) {
        // Database query
        client.query(query, params, function(err, result) {
            done();
            if (err) {
                callback(err);
            } else {
                callback(null, client, done, result.rows);
            }
        });
    },
    function(client, done, documents, callback){
        async.forEachOfSeries(documents, function (document, key, callback) {
            async.waterfall([
                function(callback){
                    // Database query
                    client.query(query_get_course_by_document, [
                        document.document_id
                    ], function(err, result) {
                        done();
                        if (err) {
                            callback(err);
                        } else {
                            // Check if Course exists
                            if (result.rows.length === 0) {
                                callback(null, false);
                            } else {
                                callback(null, result.rows[0]);
                            }
                        }
                    });
                },
                function(course, callback){
                    // Database query
                    client.query(query_get_latest_revision_by_document, [
                        document.document_id
                    ], function(err, result) {
                        done();
                        if (err) {
                            callback(err);
                        } else {
                            callback(null, course, result.rows[0]);
                        }
                    });
                },
                function(course, revision, callback){
                    // Database query
                    client.query(query_get_description_by_revision, [
                        revision.revision_id
                    ],function(err, result) {
                        done();
                        if (err) {
                            callback(err);
                        } else {
                            // Check if Description exists
                            if (result.rows.length === 0) {
                                callback(new Error("Description not found"));
                            } else {
                                callback(null, course, revision, result.rows[0]);
                            }
                        }
                    });
                },
                function(course, revision, description, callback){
                    // Database query
                    client.query(query_get_concern_by_revision, [
                        revision.revision_id
                    ], function(err, result) {
                        done();
                        if (err) {
                            callback(err);
                        } else {
                            // Check if Concern exists
                            if (result.rows.length === 0) {
                                callback(new Error("Concern not found"));
                            } else {
                                callback(null, course, revision, description, result.rows[0]);
                            }
                        }
                    });
                },
                function(course, revision, description, concern, callback){
                    // Database query
                    client.query(query_get_user, [
                        document.user_id
                    ], function(err, result) {
                        done();
                        if (err) {
                            callback(err);
                        } else {
                            // Check if User exists
                            if (result.rows.length === 0) {
                                callback(new Error("User not found"));
                            } else {
                                callback(null, course, revision, description, concern, result.rows[0]);
                            }
                        }
                    });
                },
                function(course, revision, description, concern, author, callback){
                    // Find responsible members, when document was referenced to a course
                    if(course && !JSON.parse(process.env.REMIND_ALL)){
                        // Database query
                        client.query(query_list_members_by_course, [
                            course.course_id
                        ], function(err, result) {
                            done();
                            if (err) {
                                callback(err);
                            } else {
                                // Check if Members exists
                                if (result.rows.length === 0) {
                                    callback(null, course, revision, description, concern, author, result.rows);
                                } else {
                                    callback(null, course, revision, description, concern, author, []);
                                }
                            }
                        });
                    } else {
                        callback(null, course, revision, description, concern, author, []);
                    }
                },
                function(course, revision, description, concern, author, members, callback){
                    if(members.length > 0){
                        callback(null, course, revision, description, concern, author, members)
                    } else {
                        // Database query
                        client.query(query_list_members_by_subscription_filter_by_institute, [
                            document.institute_id
                        ], function(err, result) {
                            done();
                            if (err) {
                                callback(err);
                            } else {
                                // Check if members are available
                                if(result.rows.length === 0){
                                    callback(new Error("Currently no members are available at the institute '" + document.institute_name + "'"));
                                } else {
                                    callback(null, course, revision, description, concern, author, result.rows);
                                }
                            }
                        });
                    }
                },
                function(course, revision, description, concern, author, members, callback){
                    // Formatting
                    if(concern.q01_value){
                        concern.q01_label = "badge-danger";
                        concern.q01_sign = "yes";
                    } else {
                        concern.q01_label = "badge-success";
                        concern.q01_sign = "no";
                    }

                    if(concern.q02_value){
                        concern.q02_label = "badge-danger";
                        concern.q02_sign = "yes";
                    } else {
                        concern.q02_label = "badge-success";
                        concern.q02_sign = "no";
                    }

                    if(concern.q03_value){
                        concern.q03_label = "badge-danger";
                        concern.q03_sign = "yes";
                    } else {
                        concern.q03_label = "badge-success";
                        concern.q03_sign = "no";
                    }

                    if(concern.q04_value){
                        concern.q04_label = "badge-danger";
                        concern.q04_sign = "yes";
                    } else {
                        concern.q04_label = "badge-success";
                        concern.q04_sign = "no";
                    }

                    if(concern.q05_value){
                        concern.q05_label = "badge-danger";
                        concern.q05_sign = "yes";
                    } else {
                        concern.q05_label = "badge-success";
                        concern.q05_sign = "no";
                    }

                    if(concern.q06_value){
                        concern.q06_label = "badge-danger";
                        concern.q06_sign = "yes";
                    } else {
                        concern.q06_label = "badge-success";
                        concern.q06_sign = "no";
                    }

                    if(concern.q07_value){
                        concern.q07_label = "badge-danger";
                        concern.q07_sign = "yes";
                    } else {
                        concern.q07_label = "badge-success";
                        concern.q07_sign = "no";
                    }

                    if(concern.q08_value){
                        concern.q08_label = "badge-danger";
                        concern.q08_sign = "yes";
                    } else {
                        concern.q08_label = "badge-success";
                        concern.q08_sign = "no";
                    }

                    if(concern.q09_value){
                        concern.q09_label = "badge-danger";
                        concern.q09_sign = "yes";
                    } else {
                        concern.q09_label = "badge-success";
                        concern.q09_sign = "no";
                    }

                    if(concern.q10_value){
                        concern.q10_label = "badge-danger";
                        concern.q10_sign = "yes";
                    } else {
                        concern.q10_label = "badge-success";
                        concern.q10_sign = "no";
                    }

                    if(concern.q11_1_value){
                        concern.q11_1_label = "badge-danger";
                        concern.q11_1_sign = "yes";
                    } else {
                        concern.q11_1_label = "badge-success";
                        concern.q11_1_sign = "no";
                    }

                    if(concern.q11_2_value){
                        concern.q11_2_label = "badge-danger";
                        concern.q11_2_sign = "yes";
                    } else {
                        concern.q11_2_label = "badge-success";
                        concern.q11_2_sign = "no";
                    }

                    if(concern.q12_value){
                        concern.q12_label = "badge-danger";
                        concern.q12_sign = "yes";
                    } else {
                        concern.q12_label = "badge-success";
                        concern.q12_sign = "no";
                    }

                    if(concern.q13_value){
                        concern.q13_label = "badge-danger";
                        concern.q13_sign = "yes";
                    } else {
                        concern.q13_label = "badge-success";
                        concern.q13_sign = "no";
                    }

                    // Notify each committee member
                    async.eachOfSeries(members, function (member, key, callback) {

                        // Render HTML content
                        var output = mustache.render(template_member_review_reminder, {
                            member: member,
                            author: author,
                            document: document,
                            revision: revision,
                            description: description,
                            concern: concern,
                            course: course,
                            domain: domain,
                            member_client_path: member_client_path,
                            year: moment().format("YYYY")
                        });

                        // Render text for emails without HTML support
                        var text = "Review reminder";

                        // Send email
                        transporter.sendMail({
                            from: {
                                name: process.env.SENDER_NAME,
                                address: process.env.SENDER_EMAIL_ADDRESS
                            },
                            to: member.email_address,
                            subject: "[Ethics-App] Review reminder",
                            text: text,
                            html: output
                        }, function(err, info) {
                            if (err) {
                                callback(err);
                            } else {
                                callback(null);
                            }
                        });

                    }, function(err){
                        if(err){
                            callback(err);
                        } else {
                            callback(null);
                        }
                    });
                }
            ], function(err){
                if(err){
                    callback(err);
                } else {
                    console.log(colors.blue(new Date() + " Reminder has been sent for document '" + document.document_id + "'"));
                    callback(null);
                }
            });
        }, function (err) {
            if(err){
                callback(err);
            } else {
                callback(null);
            }
        });
    }
], function(err, result) {
    if(err){
        console.error(colors.red(err));
    } else {
        console.log(colors.green(new Date() + " Reminder has been completed!"));
    }
    // Close reminder
    process.exit(1);
});
