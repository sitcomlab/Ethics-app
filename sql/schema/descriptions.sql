DROP TABLE IF EXISTS Descriptions CASCADE;

-- SCHEMA
CREATE TABLE Descriptions (

    -- General
    description_id SERIAL PRIMARY KEY,
    created TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),

    -- Attributes
    revision_id INTEGER NOT NULL REFERENCES Revisions(revision_id) ON UPDATE CASCADE ON DELETE CASCADE,
    de_used BOOLEAN NOT NULL DEFAULT false,
    en_title TEXT DEFAULT NULL,          -- 1st question
    en_researcher TEXT DEFAULT NULL,     -- 2nd question
    en_study_time TEXT DEFAULT NULL,     -- 3rd question
    en_purpose TEXT DEFAULT NULL,        -- 4th question
    en_procedure TEXT DEFAULT NULL,      -- 5th question
    en_duration TEXT DEFAULT NULL,       -- 6th question
    en_risks TEXT DEFAULT NULL,          -- 7th question
    en_benefits TEXT DEFAULT NULL,       -- 8th question
    de_title TEXT DEFAULT NULL,          -- 1st question
    de_researcher TEXT DEFAULT NULL,     -- 2nd question
    de_study_time TEXT DEFAULT NULL,     -- 3rd question
    de_purpose TEXT DEFAULT NULL,        -- 4th question
    de_procedure TEXT DEFAULT NULL,      -- 5th question
    de_duration TEXT DEFAULT NULL,       -- 6th question
    de_risks TEXT DEFAULT NULL,          -- 7th question
    de_benefits TEXT DEFAULT NULL       -- 8th question

);
