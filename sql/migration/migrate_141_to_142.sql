-- Add q09_1 and q09_2 to Concerns
ALTER TABLE Concerns
    ADD COLUMN q09_1_value BOOLEAN,
    ADD COLUMN q09_1_explanation TEXT,
    ADD COLUMN q09_2_value BOOLEAN,
    ADD COLUMN q09_2_explanation TEXT;

-- Add q09_1 and q09_2 to Comments 
ALTER TABLE Comments
    ADD COLUMN q09_1_comment TEXT,
    ADD COLUMN q09_2_comment TEXT;

-- Add en_used to Descriptions 
ALTER TABLE Descriptions
    ADD COLUMN en_used BOOLEAN;

-- Set en_used = true for all pre-migration data
UPDATE Descriptions
SET en_used = true;

-- Enforce the NOT NULL constraint and default going forward
ALTER TABLE Descriptions
    ALTER COLUMN en_used SET DEFAULT false;