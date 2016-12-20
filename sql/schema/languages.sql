-- DELETE ALL TYPES
DROP TYPE IF EXISTS languages CASCADE;

-- CREATE ALL TYPES
CREATE TYPE languages AS ENUM (
    'en',
    'de'
);
