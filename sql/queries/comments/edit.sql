UPDATE Comments SET (
    updated,
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
    q13_comment,
    q14_comment
) = (
    now(),
    $2::BOOLEAN,
    $3::TEXT,

    -- English
    $4::TEXT,
    $5::TEXT,
    $6::TEXT,
    $7::TEXT,
    $8::TEXT,
    $9::TEXT,
    $10::TEXT,
    $11::TEXT,

    -- German
    $12::TEXT,
    $13::TEXT,
    $14::TEXT,
    $15::TEXT,
    $16::TEXT,
    $17::TEXT,
    $18::TEXT,
    $19::TEXT,

    -- Portuguese
    $20::TEXT,
    $21::TEXT,
    $22::TEXT,
    $23::TEXT,
    $24::TEXT,
    $25::TEXT,
    $26::TEXT,
    $27::TEXT,

    -- Concerns
    $28::TEXT,
    $29::TEXT,
    $30::TEXT,
    $31::TEXT,
    $32::TEXT,
    $33::TEXT,
    $34::TEXT,
    $35::TEXT,
    $36::TEXT,
    $37::TEXT,
    $38::TEXT,
    $39::TEXT,
    $40::TEXT,
    $41::TEXT,
    $42::TEXT
)
WHERE
    comment_id=$1::INTEGER
RETURNING *;
