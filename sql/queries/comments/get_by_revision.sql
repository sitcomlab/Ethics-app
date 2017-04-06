SELECT
    comment_id,
    created,
    updated,
    revision_id,
    published,
    general_comment,

    -- English
    en_title_comment,
    en_researcher_comment,
    en_study_time_comment,
    en_purpose_comment,
    en_procedure_comment,
    en_duration_comment,
    en_risks_comment,
    en_benefits_comment,

    -- German
    de_title_comment,
    de_researcher_comment,
    de_study_time_comment,
    de_purpose_comment,
    de_procedure_comment,
    de_duration_comment,
    de_risks_comment,
    de_benefits_comment,

    -- Portuguese
    pt_title_comment,
    pt_researcher_comment,
    pt_study_time_comment,
    pt_purpose_comment,
    pt_procedure_comment,
    pt_duration_comment,
    pt_risks_comment,
    pt_benefits_comment,

    -- Concerns
    q01_comment,
    q02_comment,
    q03_comment,
    q04_comment,
    q05_comment,
    q06_comment,
    q07_comment,
    q08_comment,
    q09_comment,
    q10_comment,
    q11_1_comment,
    q11_2_comment,
    q12_comment,
    q13_comment
FROM Comments
WHERE revision_id=$1::INTEGER;
