-- Universities
INSERT INTO Universities (
    university_name
) VALUES (
    'Other'
), (
    'University of Muenster'
), (
    'Portuguese University'
);


-- Institutes
INSERT INTO Institutes (
    institute_name,
    university_id
) VALUES (
    'Other',
    1
), (
    'Institute for Geoinformatics',
    2
), (
    'Institute for Geography',
    2
), (
    'Institute for Landscape Ecology',
    2
);


-- Resarch groups
INSERT INTO Research_Groups (
    research_group_name,
    institute_id
) VALUES (
    'Geosimulation modelling lab',
    2
), (
    'GI@School',
    2
), (
    'Ifgicopter',
    2
), (
    'Open lab on spatial information infrastructures',
    2
), (
    'Spatial intelligence lab',
    2
), (
    'Situated computing and interaction lab',
    2
), (
    'Spatio-temporal modelling lab',
    2
);
