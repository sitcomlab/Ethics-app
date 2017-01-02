DROP TABLE IF EXISTS Description_comments CASCADE;

-- SCHEMA
CREATE TABLE Description_comments (

    -- General
    description_comment_id SERIAL PRIMARY KEY,
    created TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),

    -- Attributes
    document_id CHARACTER VARYING(255) NOT NULL REFERENCES Documents(document_id) ON UPDATE CASCADE ON DELETE CASCADE,
    user_id INTEGER NOT NULL REFERENCES Users(user_id) ON UPDATE CASCADE ON DELETE SET NULL,
    language languages NOT NULL,
    question SMALLINT NOT NULL CHECK (question >= 0),
    comment CHARACTER VARYING(255) NOT NULL
);
