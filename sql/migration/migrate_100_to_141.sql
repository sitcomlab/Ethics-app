-- Add to Concerns
ALTER TABLE Concerns ADD q14_value BOOLEAN DEFAULT NULL;
ALTER TABLE Concerns ADD q14_explanation TEXT DEFAULT NULL;
ALTER TABLE Concerns ADD q14_filename TEXT DEFAULT NULL;
ALTER TABLE Concerns ADD q14_filepath TEXT DEFAULT NULL;

-- Add to Comments
ALTER TABLE Comments ADD q14_comment TEXT DEFAULT NULL;
