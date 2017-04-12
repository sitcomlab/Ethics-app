DROP TABLE IF EXISTS Institutes CASCADE;

-- SCHEMA
CREATE TABLE Institutes (

    -- General
    institute_id SERIAL PRIMARY KEY,
    created TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),

    -- Attributes
    institute_name CHARACTER VARYING(255) NOT NULL,
    university_id INTEGER NOT NULL REFERENCES Universities(university_id) ON UPDATE CASCADE ON DELETE CASCADE,
    former BOOLEAN NOT NULL DEFAULT false
);
