DROP TABLE IF EXISTS Revisions CASCADE;

-- SCHEMA
CREATE TABLE Revisions (

    -- General
    revision_id SERIAL PRIMARY KEY,
    created TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),

    -- Attributes
    document_id CHARACTER VARYING(255) NOT NULL REFERENCES Documents(document_id) ON UPDATE CASCADE ON DELETE CASCADE,
    version SMALLINT NOT NULL

);
