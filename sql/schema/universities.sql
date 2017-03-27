DROP TABLE IF EXISTS Universities CASCADE;

-- SCHEMA
CREATE TABLE Universities (

    -- General
    university_id SERIAL PRIMARY KEY,
    created TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),

    -- Attributes
    university_name CHARACTER VARYING(255) NOT NULL
);
