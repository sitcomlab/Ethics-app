DROP TABLE IF EXISTS Research_Groups CASCADE;

-- SCHEMA
CREATE TABLE Research_Groups (

    -- General
    research_group_id SERIAL PRIMARY KEY,
    created TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),

    -- Attributes
    research_group_name CHARACTER VARYING(255) NOT NULL,
    institute_id INTEGER NOT NULL REFERENCES Institutes(institute_id) ON UPDATE CASCADE ON DELETE CASCADE,
    deleted BOOLEAN NOT NULL DEFAULT false 

);
