DROP TABLE IF EXISTS Descriptions CASCADE;

-- SCHEMA
CREATE TABLE Descriptions (

    -- General
    description_id SERIAL PRIMARY KEY,
    created TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),

    -- Attributes
    revision_id INTEGER NOT NULL REFERENCES Revisions(revision_id) ON UPDATE CASCADE ON DELETE CASCADE,
    language languages NOT NULL,
    title CHARACTER VARYING(255) DEFAULT NULL,          -- 1st question
    researcher CHARACTER VARYING(255) DEFAULT NULL,     -- 2nd question
    study_time CHARACTER VARYING(255) DEFAULT NULL,     -- 3rd question
    purpose CHARACTER VARYING(255) DEFAULT NULL,        -- 4th question
    procedure CHARACTER VARYING(255) DEFAULT NULL,      -- 5th question
    duration CHARACTER VARYING(255) DEFAULT NULL,       -- 6th question
    risks CHARACTER VARYING(255) DEFAULT NULL,          -- 7th question
    benefits CHARACTER VARYING(255) DEFAULT NULL        -- 8th question

);
