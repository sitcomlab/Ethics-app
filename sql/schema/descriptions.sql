DROP TABLE IF EXISTS Descriptions CASCADE;

-- SCHEMA
CREATE TABLE Descriptions (

    -- General
    description_id SERIAL PRIMARY KEY,
    created TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),

    -- Attributes
    revision_id INTEGER NOT NULL REFERENCES Revisions(revision_id) ON UPDATE CASCADE ON DELETE CASCADE,

        -- English
        en_used BOOLEAN NOT NULL DEFAULT false,
        en_title TEXT DEFAULT NULL,
        en_researcher TEXT DEFAULT NULL,
        en_study_time TEXT DEFAULT NULL,
        en_purpose TEXT DEFAULT NULL,
        en_procedure TEXT DEFAULT NULL,
        en_duration TEXT DEFAULT NULL,
        en_risks TEXT DEFAULT NULL,
        en_benefits TEXT DEFAULT NULL,

        -- German
        de_used BOOLEAN NOT NULL DEFAULT false,
        de_title TEXT DEFAULT NULL,
        de_researcher TEXT DEFAULT NULL,
        de_study_time TEXT DEFAULT NULL,
        de_purpose TEXT DEFAULT NULL,
        de_procedure TEXT DEFAULT NULL,
        de_duration TEXT DEFAULT NULL,
        de_risks TEXT DEFAULT NULL,
        de_benefits TEXT DEFAULT NULL,

        -- Portuguese
        pt_used BOOLEAN NOT NULL DEFAULT false,
        pt_title TEXT DEFAULT NULL,
        pt_researcher TEXT DEFAULT NULL,
        pt_study_time TEXT DEFAULT NULL,
        pt_purpose TEXT DEFAULT NULL,
        pt_procedure TEXT DEFAULT NULL,
        pt_duration TEXT DEFAULT NULL,
        pt_risks TEXT DEFAULT NULL,
        pt_benefits TEXT DEFAULT NULL
        
);
