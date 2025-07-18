DROP TABLE IF EXISTS Concerns CASCADE;

-- SCHEMA
CREATE TABLE Concerns (

    -- General
    concern_id SERIAL PRIMARY KEY,
    created TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),

    -- Attributes
    revision_id INTEGER NOT NULL REFERENCES Revisions(revision_id) ON UPDATE CASCADE ON DELETE CASCADE,
    q01_value BOOLEAN DEFAULT NULL,
    q01_explanation TEXT DEFAULT NULL,
    q02_value BOOLEAN DEFAULT NULL,
    q02_explanation TEXT DEFAULT NULL,
    q03_value BOOLEAN DEFAULT NULL,
    q03_explanation TEXT DEFAULT NULL,
    q04_value BOOLEAN DEFAULT NULL,
    q04_explanation TEXT DEFAULT NULL,
    q05_value BOOLEAN DEFAULT NULL,
    q05_explanation TEXT DEFAULT NULL,
    q06_value BOOLEAN DEFAULT NULL,
    q06_explanation TEXT DEFAULT NULL,
    q07_value BOOLEAN DEFAULT NULL,
    q07_explanation TEXT DEFAULT NULL,
    q08_value BOOLEAN DEFAULT NULL,
    q08_explanation TEXT DEFAULT NULL,
    q09_1_value BOOLEAN DEFAULT NULL,
    q09_1_explanation TEXT DEFAULT NULL,
    q09_2_value BOOLEAN DEFAULT NULL,
    q09_2_explanation TEXT DEFAULT NULL,
    q10_value BOOLEAN DEFAULT NULL,
    q10_explanation TEXT DEFAULT NULL,
    q11_1_value BOOLEAN DEFAULT NULL,
    q11_1_explanation TEXT DEFAULT NULL,
    q11_2_value BOOLEAN DEFAULT NULL,
    q11_2_explanation TEXT DEFAULT NULL,
    q12_value BOOLEAN DEFAULT NULL,
    q12_explanation TEXT DEFAULT NULL,
    q13_value BOOLEAN DEFAULT NULL,
    q13_explanation TEXT DEFAULT NULL,
    q14_value BOOLEAN DEFAULT NULL,
    q14_explanation TEXT DEFAULT NULL,
    q14_filename TEXT DEFAULT NULL,
    q14_filepath TEXT DEFAULT NULL
);
