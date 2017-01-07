DROP TABLE IF EXISTS Review_Descriptions CASCADE;

-- SCHEMA
CREATE TABLE Review_Descriptions (

    -- General
    review_description_id SERIAL PRIMARY KEY,
    created TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),

    -- Attributes
    review_id INTEGER NOT NULL REFERENCES Reviews(review_id) ON UPDATE CASCADE ON DELETE CASCADE,
    description_id INTEGER NOT NULL REFERENCES Descriptions(description_id) ON UPDATE CASCADE ON DELETE CASCADE,
    comment_title TEXT DEFAULT NULL,          -- 1st question
    comment_researcher TEXT DEFAULT NULL,     -- 2nd question
    comment_study_time TEXT DEFAULT NULL,     -- 3rd question
    comment_purpose TEXT DEFAULT NULL,        -- 4th question
    comment_procedure TEXT DEFAULT NULL,      -- 5th question
    comment_duration TEXT DEFAULT NULL,       -- 6th question
    comment_risks TEXT DEFAULT NULL,          -- 7th question
    comment_benefits TEXT DEFAULT NULL        -- 8th question

);
