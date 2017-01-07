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
    used BOOLEAN NOT NULL,
    title TEXT DEFAULT NULL,          -- 1st question
    researcher TEXT DEFAULT NULL,     -- 2nd question
    study_time TEXT DEFAULT NULL,     -- 3rd question
    purpose TEXT DEFAULT NULL,        -- 4th question
    procedure TEXT DEFAULT NULL,      -- 5th question
    duration TEXT DEFAULT NULL,       -- 6th question
    risks TEXT DEFAULT NULL,          -- 7th question
    benefits TEXT DEFAULT NULL        -- 8th question

);
