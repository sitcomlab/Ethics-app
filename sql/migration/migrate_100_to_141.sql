-- Add to Comments

ALTER TABLE Comments ADD en_purpose_and_procedure_comment text default null;
ALTER TABLE Comments ADD de_purpose_and_procedure_comment text default null;
ALTER TABLE Comments ADD pt_purpose_and_procedure_comment text default null;

-- Add to Descriptions
ALTER TABLE Descriptions ADD en_purpose_and_procedure boolean default null;
ALTER TABLE Descriptions ADD de_purpose_and_procedure boolean default null;
ALTER TABLE Descriptions ADD pt_purpose_and_procedure boolean default null;
