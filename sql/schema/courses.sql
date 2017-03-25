DROP TABLE IF EXISTS Courses CASCADE;

-- SCHEMA
CREATE TABLE Courses (

    -- General
    course_id SERIAL PRIMARY KEY,
    created TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),

    -- Attributes
    course_name CHARACTER VARYING(255) NOT NULL,
    term CHARACTER VARYING(255) NOT NULL, -- examples: 'WT16/17' (winter term), 'ST17' (summer term)
    lecturer CHARACTER VARYING(255) DEFAULT NULL,
    institute_id INTEGER NOT NULL REFERENCES Institutes(institute_id) ON UPDATE CASCADE ON DELETE CASCADE

);
