DROP TABLE IF EXISTS Documents CASCADE;

-- SCHEMA
CREATE TABLE Documents (

    -- General
    document_id CHARACTER VARYING(255) PRIMARY KEY,
    created TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),

    -- Attributes
    user_id INTEGER NOT NULL REFERENCES Users(user_id) ON UPDATE CASCADE ON DELETE CASCADE,
    document_title CHARACTER VARYING(255) NOT NULL,
    hasSecureStoragePassword BOOLEAN DEFAULT false NOT NULL,
    status SMALLINT NOT NULL CHECK (status >= 0 AND status <= 7) DEFAULT 0
        -- 0 = unsubmitted - init (empty)
        -- 1 = unsubmitted - saved (in progress)
        -- 2 = submitted - ok (no review required)
        -- 3 = submitted - review required
        -- 4 = submitted - under review (in progress)
        -- 5 = reviewed - partly accepted
        -- 6 = reviewed - ok
        -- 7 = reviewed - rejected

);
