ALTER TABLE recruitment.user_info ADD cuil_cuit varchar(11) NOT NULL;

ALTER TABLE recruitment.nationality ALTER COLUMN code TYPE varchar(10) USING code::varchar(10);