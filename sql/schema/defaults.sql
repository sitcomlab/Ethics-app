-- Universities
INSERT INTO Universities (
    university_name
) VALUES (
    'Other'
), (
    'University of Münster'
), (
    'Portuguese University'
);


-- Institutes
INSERT INTO Institutes (
    institute_name,
    university_id
) VALUES (
    'Institute for Geoinformatics',
    1
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
    1
), (
    'GI@School',
    1
), (
    'Ifgicopter',
    1
), (
    'Open lab on spatial information infrastructures',
    1
), (
    'Spatial intelligence lab',
    1
), (
    'Situated computing and interaction lab',
    1
), (
    'Spatio-temporal modelling lab',
    1
);
