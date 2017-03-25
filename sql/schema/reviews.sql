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
    notes TEXT DEFAULT NULL, -- Working notes for (other) members
    general_comment TEXT DEFAULT NULL,

    -- Descriptions
    comment_en_title TEXT DEFAULT NULL,         -- English
    comment_en_researcher TEXT DEFAULT NULL,
    comment_en_study_time TEXT DEFAULT NULL,
    comment_en_purpose TEXT DEFAULT NULL,
    comment_en_procedure TEXT DEFAULT NULL,
    comment_en_duration TEXT DEFAULT NULL,
    comment_en_risks TEXT DEFAULT NULL,
    comment_en_benefits TEXT DEFAULT NULL,
    comment_de_title TEXT DEFAULT NULL,         -- German
    comment_de_researcher TEXT DEFAULT NULL,
    comment_de_study_time TEXT DEFAULT NULL,
    comment_de_purpose TEXT DEFAULT NULL,
    comment_de_procedure TEXT DEFAULT NULL,
    comment_de_duration TEXT DEFAULT NULL,
    comment_de_risks TEXT DEFAULT NULL,
    comment_de_benefits TEXT DEFAULT NULL,
    comment_pt_title TEXT DEFAULT NULL,         -- Portuguese
    comment_pt_researcher TEXT DEFAULT NULL,
    comment_pt_study_time TEXT DEFAULT NULL,
    comment_pt_purpose TEXT DEFAULT NULL,
    comment_pt_procedure TEXT DEFAULT NULL,
    comment_pt_duration TEXT DEFAULT NULL,
    comment_pt_risks TEXT DEFAULT NULL,
    comment_pt_benefits TEXT DEFAULT NULL,

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
