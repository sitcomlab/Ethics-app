DROP TABLE IF EXISTS Reviews CASCADE;

-- SCHEMA
CREATE TABLE Reviews (

    -- General
    review_id SERIAL PRIMARY KEY,
    created TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),

    -- Attributes
    member_id INTEGER NOT NULL REFERENCES Members(member_id) ON UPDATE CASCADE ON DELETE SET NULL,
    revision_id INTEGER NOT NULL REFERENCES Revisions(revision_id) ON UPDATE CASCADE ON DELETE SET NULL,
    comment TEXT DEFAULT NULL,

    -- Descriptions
    comment_en_title TEXT DEFAULT NULL,          -- 1st question
    comment_en_researcher TEXT DEFAULT NULL,     -- 2nd question
    comment_en_study_time TEXT DEFAULT NULL,     -- 3rd question
    comment_en_purpose TEXT DEFAULT NULL,        -- 4th question
    comment_en_procedure TEXT DEFAULT NULL,      -- 5th question
    comment_en_duration TEXT DEFAULT NULL,       -- 6th question
    comment_en_risks TEXT DEFAULT NULL,          -- 7th question
    comment_en_benefits TEXT DEFAULT NULL,        -- 8th question
    comment_de_title TEXT DEFAULT NULL,          -- 1st question
    comment_de_researcher TEXT DEFAULT NULL,     -- 2nd question
    comment_de_study_time TEXT DEFAULT NULL,     -- 3rd question
    comment_de_purpose TEXT DEFAULT NULL,        -- 4th question
    comment_de_procedure TEXT DEFAULT NULL,      -- 5th question
    comment_de_duration TEXT DEFAULT NULL,       -- 6th question
    comment_de_risks TEXT DEFAULT NULL,          -- 7th question
    comment_de_benefits TEXT DEFAULT NULL,       -- 8th question

    -- Concerns
    q01_comment TEXT DEFAULT NULL,
    q02_comment TEXT DEFAULT NULL,
    q03_comment TEXT DEFAULT NULL,
    q04_comment TEXT DEFAULT NULL,
    q05_comment TEXT DEFAULT NULL,
    q06_comment TEXT DEFAULT NULL,
    q07_comment TEXT DEFAULT NULL,
    q08_comment TEXT DEFAULT NULL,
    q09_comment TEXT DEFAULT NULL,
    q10_comment TEXT DEFAULT NULL,
    q11_1_comment TEXT DEFAULT NULL,
    q11_2_comment TEXT DEFAULT NULL,
    q12_comment TEXT DEFAULT NULL,
    q13_comment TEXT DEFAULT NULL

);
