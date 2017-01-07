DROP TABLE IF EXISTS Review_Concerns CASCADE;

-- SCHEMA
CREATE TABLE Review_Concerns (

    -- General
    review_concern_id SERIAL PRIMARY KEY,
    created TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),

    -- Attributes
    review_id INTEGER NOT NULL REFERENCES Reviews(review_id) ON UPDATE CASCADE ON DELETE CASCADE,
    description_id INTEGER NOT NULL REFERENCES Descriptions(description_id) ON UPDATE CASCADE ON DELETE CASCADE,
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
