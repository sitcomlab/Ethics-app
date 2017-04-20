DROP TABLE IF EXISTS Reviewers CASCADE;

-- SCHEMA
CREATE TABLE Reviewers (

    -- General
    reviewer_id SERIAL PRIMARY KEY,
    created TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),

    -- Attributes
    member_id INTEGER REFERENCES Members(member_id) ON UPDATE CASCADE ON DELETE SET NULL,
    revision_id INTEGER REFERENCES Revisions(revision_id) ON UPDATE CASCADE ON DELETE SET NULL
    
);
