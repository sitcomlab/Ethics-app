-- Add to Concerns
ALTER TABLE Concerns ADD q14_value boolean default null;
ALTER TABLE Concerns ADD q14_explanation text default null;
ALTER TABLE Concerns ADD q14_filename text default null;
ALTER TABLE Concerns ADD q14_filepath text default null;

-- Add to Comments

ALTER TABLE Comments ADD q14_comment text default null;