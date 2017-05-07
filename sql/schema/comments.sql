DROP TABLE IF EXISTS Comments CASCADE;

-- SCHEMA
CREATE TABLE Comments (

    -- General
    comment_id SERIAL PRIMARY KEY,
    created TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),

    -- Attributes
    revision_id INTEGER NOT NULL REFERENCES Revisions(revision_id) ON UPDATE CASCADE ON DELETE CASCADE,
    published BOOLEAN NOT NULL DEFAULT false,
    general_comment TEXT DEFAULT NULL,

    -- Descriptions

        -- English
        en_title_comment TEXT DEFAULT NULL,
        en_researcher_comment TEXT DEFAULT NULL,
        en_study_time_comment TEXT DEFAULT NULL,
        en_purpose_comment TEXT DEFAULT NULL,
        en_procedure_comment TEXT DEFAULT NULL,
        en_duration_comment TEXT DEFAULT NULL,
        en_risks_comment TEXT DEFAULT NULL,
        en_benefits_comment TEXT DEFAULT NULL,

        -- German
        de_title_comment TEXT DEFAULT NULL,
        de_researcher_comment TEXT DEFAULT NULL,
        de_study_time_comment TEXT DEFAULT NULL,
        de_purpose_comment TEXT DEFAULT NULL,
        de_procedure_comment TEXT DEFAULT NULL,
        de_duration_comment TEXT DEFAULT NULL,
        de_risks_comment TEXT DEFAULT NULL,
        de_benefits_comment TEXT DEFAULT NULL,

        -- Portuguese
        pt_title_comment TEXT DEFAULT NULL,
        pt_researcher_comment TEXT DEFAULT NULL,
        pt_study_time_comment TEXT DEFAULT NULL,
        pt_purpose_comment TEXT DEFAULT NULL,
        pt_procedure_comment TEXT DEFAULT NULL,
        pt_duration_comment TEXT DEFAULT NULL,
        pt_risks_comment TEXT DEFAULT NULL,
        pt_benefits_comment TEXT DEFAULT NULL,

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
