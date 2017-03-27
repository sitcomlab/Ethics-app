DROP TABLE IF EXISTS Courses CASCADE;

-- SCHEMA
CREATE TABLE Courses (

    -- General
    course_id SERIAL PRIMARY KEY,
    created TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),

    -- Attributes
    course_name CHARACTER VARYING(255) NOT NULL,
    year INTEGER NOT NULL DEFAULT 0,
    term BOOLEAN NOT NULL DEFAULT true, -- true = winter term, false = summer term
    lecturer CHARACTER VARYING(255) DEFAULT NULL,
    institute_id INTEGER NOT NULL REFERENCES Institutes(institute_id) ON UPDATE CASCADE ON DELETE CASCADE,
    deleted BOOLEAN NOT NULL DEFAULT false

);
