DROP TABLE IF EXISTS Persons_In_Charge CASCADE;

-- SCHEMA
CREATE TABLE Persons_In_Charge (

    -- General
    person_in_charge_id SERIAL PRIMARY KEY,
    created TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),

    -- Attributes
    course_id INTEGER NOT NULL REFERENCES Courses(course_id) ON UPDATE CASCADE ON DELETE CASCADE,
    member_id INTEGER NOT NULL REFERENCES Members(member_id) ON UPDATE CASCADE ON DELETE CASCADE

);
