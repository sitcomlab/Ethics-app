DROP TABLE IF EXISTS Committee CASCADE;

-- SCHEMA
CREATE TABLE Committee (

    -- General
    committee_id SERIAL PRIMARY KEY,
    created TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),

    -- Attributes
    user_id INTEGER NOT NULL REFERENCES Users(user_id) ON UPDATE CASCADE ON DELETE CASCADE,
    password TEXT NOT NULL,
    subscribed BOOLEAN DEFAULT true,
    institute CHARACTER VARYING(255) DEFAULT NULL,
    research_lab CHARACTER VARYING(255) DEFAULT NULL,
    office_room_number CHARACTER VARYING(255) DEFAULT NULL,
    office_phone_number CHARACTER VARYING(255) DEFAULT NULL,
    office_fax_number CHARACTER VARYING(255) DEFAULT NULL,
    fails SMALLINT DEFAULT 0 NOT NULL
);

-- Admin-account
INSERT INTO Committee (
    user_id,
    password,
    institute,
    office_room_number,
    office_phone_number
) VALUES (
    1,
    crypt('123456', gen_salt('md5')),
    'Institute for Geoinformatics',
    '117',
    '+492518333080'
);
