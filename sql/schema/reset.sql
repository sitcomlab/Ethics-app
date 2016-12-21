-- DELETE ALL TABLES
DROP TABLE IF EXISTS Users CASCADE;
DROP TABLE IF EXISTS Committee CASCADE;
DROP TABLE IF EXISTS Documents CASCADE;
DROP TABLE IF EXISTS Revisions CASCADE;
DROP TABLE IF EXISTS Descriptions CASCADE;
DROP TABLE IF EXISTS Concerns CASCADE;
DROP TABLE IF EXISTS Comments CASCADE;

-- DELETE ALL TYPES
DROP TYPE IF EXISTS languages CASCADE;

-- DELETE ALL EXTENSIONS
DROP EXTENSION IF EXISTS pgcrypto;

-- CREATE EXTENSIONS
CREATE EXTENSION pgcrypto;