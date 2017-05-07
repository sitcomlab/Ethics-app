DROP TABLE IF EXISTS Working_Groups CASCADE;

-- SCHEMA
CREATE TABLE Working_Groups (

    -- General
    working_group_id SERIAL PRIMARY KEY,
    created TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),

    -- Attributes
    working_group_name CHARACTER VARYING(255) NOT NULL,
    institute_id INTEGER NOT NULL REFERENCES Institutes(institute_id) ON UPDATE CASCADE ON DELETE CASCADE,
    former BOOLEAN NOT NULL DEFAULT false

);
