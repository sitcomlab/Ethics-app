DROP TABLE IF EXISTS Descriptions CASCADE;

-- SCHEMA
CREATE TABLE Descriptions (

    -- General
    description_id SERIAL PRIMARY KEY,
    created TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),

    -- Attributes
    document_id CHARACTER VARYING(255) NOT NULL REFERENCES Documents(document_id) ON UPDATE CASCADE ON DELETE CASCADE,
    revision_id INTEGER NOT NULL REFERENCES Revisions(revision_id) ON UPDATE CASCADE ON DELETE CASCADE,
    language languages NOT NULL,
    question SMALLINT NOT NULL CHECK (question >= 1),
    value CHARACTER VARYING(255) NOT NULL

);
