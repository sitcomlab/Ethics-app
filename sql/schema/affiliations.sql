DROP TABLE IF EXISTS Affiliations CASCADE;

-- SCHEMA
CREATE TABLE Affiliations (

    -- General
    affiliation_id SERIAL PRIMARY KEY,

    -- Attributes
    document_id TEXT NOT NULL REFERENCES Documents(document_id) ON UPDATE CASCADE ON DELETE CASCADE,
    course_id INTEGER NOT NULL REFERENCES Courses(course_id) ON UPDATE CASCADE ON DELETE CASCADE

);
