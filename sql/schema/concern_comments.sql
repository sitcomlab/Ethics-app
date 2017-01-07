DROP TABLE IF EXISTS Concern_comments CASCADE;

-- SCHEMA
CREATE TABLE Concern_comments (

    -- General
    concern_comment_id SERIAL PRIMARY KEY,
    created TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),

    -- Attributes
    document_id CHARACTER VARYING(255) NOT NULL REFERENCES Documents(document_id) ON UPDATE CASCADE ON DELETE CASCADE,
    committee_id INTEGER NOT NULL REFERENCES Committee(committee_id) ON UPDATE CASCADE ON DELETE SET NULL,
    question SMALLINT NOT NULL CHECK (question >= 0),
    comment CHARACTER VARYING(255) NOT NULL
    
);
