-- recruitment.job_application_period definition

-- Drop table

-- DROP TABLE recruitment.job_application_period;

CREATE TABLE recruitment.job_application_period (
	id bigserial NOT NULL,
	code varchar(100) NOT NULL,
	description varchar(255) NULL,
	CONSTRAINT job_application_period_code_key UNIQUE (code),
	CONSTRAINT job_application_period_pkey PRIMARY KEY (id)
);


-- recruitment.job_application_status definition

-- Drop table

-- DROP TABLE recruitment.job_application_status;

CREATE TABLE recruitment.job_application_status (
	id bigserial NOT NULL,
	"name" varchar(100) NOT NULL,
	description varchar(255) NULL,
	CONSTRAINT job_application_status_name_key UNIQUE (name),
	CONSTRAINT job_application_status_pkey PRIMARY KEY (id)
);


-- recruitment.requirement_type definition

-- Drop table

-- DROP TABLE recruitment.requirement_type;

CREATE TABLE recruitment.requirement_type (
	id bigserial NOT NULL,
	"name" varchar(100) NOT NULL,
	description varchar(255) NULL,
	CONSTRAINT requirement_type_name_key UNIQUE (name),
	CONSTRAINT requirement_type_pkey PRIMARY KEY (id)
);


-- recruitment.requirement definition

-- Drop table

-- DROP TABLE recruitment.requirement;

CREATE TABLE recruitment.requirement (
	id bigserial NOT NULL,
	description varchar(500) NOT NULL,
	requirement_type_id int8 NOT NULL,
	"operator" varchar(25) NOT NULL,
	expected_value varchar(150) NOT NULL,
	active bool NOT NULL,
	user_id_creator int8 NOT NULL,
	created_date timestamp NULL,
	updated_date timestamp NULL,
	CONSTRAINT requirement_pkey PRIMARY KEY (id),
	CONSTRAINT fk_requirement_requirement_type FOREIGN KEY (user_id_creator) REFERENCES recruitment.requirement_type(id) ON DELETE CASCADE
);


-- recruitment.job_application definition

-- Drop table

-- DROP TABLE recruitment.job_application;

CREATE TABLE recruitment.job_application (
	id bigserial NOT NULL,
	code varchar(36) NOT NULL,
	title varchar(150) NOT NULL,
	description varchar(5000) NOT NULL,
	job_application_status_id int8 NOT NULL,
	job_application_period_id int8 NOT NULL,
	min_approvers int8 NULL,
	reason varchar(500) NOT NULL,
	year_period int8 NOT NULL,
	active bool NOT NULL,
	user_id_creator int8 NOT NULL,
	created_date timestamp NULL,
	updated_date timestamp NULL,
	CONSTRAINT job_application_pkey PRIMARY KEY (id)
);


-- recruitment.job_application_approval definition

-- Drop table

-- DROP TABLE recruitment.job_application_approval;

CREATE TABLE recruitment.job_application_approval (
	id bigserial NOT NULL,
	job_application_id int8 NOT NULL,
	approved bool NULL,
	reason varchar(500) NOT NULL,
	user_id_approval int8 NOT NULL,
	created_date timestamp NULL,
	updated_date timestamp NULL,
	CONSTRAINT job_application_approval_pkey PRIMARY KEY (id)
);


-- recruitment.requirement_job_application definition

-- Drop table

-- DROP TABLE recruitment.requirement_job_application;

CREATE TABLE recruitment.requirement_job_application (
	id bigserial NOT NULL,
	job_application_id int8 NOT NULL,
	requirement_id int8 NOT NULL,
	CONSTRAINT requirement_job_application_pkey PRIMARY KEY (id)
);


-- recruitment.job_application foreign keys

ALTER TABLE recruitment.job_application ADD CONSTRAINT fk_job_application_job_app_user FOREIGN KEY (user_id_creator) REFERENCES recruitment.app_user(id) ON DELETE CASCADE;
ALTER TABLE recruitment.job_application ADD CONSTRAINT fk_job_application_job_application_period FOREIGN KEY (job_application_status_id) REFERENCES recruitment.job_application_status(id) ON DELETE CASCADE;
ALTER TABLE recruitment.job_application ADD CONSTRAINT fk_job_application_job_application_status FOREIGN KEY (job_application_period_id) REFERENCES recruitment.job_application_period(id) ON DELETE CASCADE;


-- recruitment.job_application_approval foreign keys

ALTER TABLE recruitment.job_application_approval ADD CONSTRAINT fk_job_application_approval_job_application FOREIGN KEY (job_application_id) REFERENCES recruitment.job_application(id) ON DELETE CASCADE;
ALTER TABLE recruitment.job_application_approval ADD CONSTRAINT fk_job_application_approval_user FOREIGN KEY (user_id_approval) REFERENCES recruitment.app_user(id) ON DELETE CASCADE;


-- recruitment.requirement_job_application foreign keys

ALTER TABLE recruitment.requirement_job_application ADD CONSTRAINT fk_requirement_job_application_job_application FOREIGN KEY (job_application_id) REFERENCES recruitment.job_application(id) ON DELETE CASCADE;
ALTER TABLE recruitment.requirement_job_application ADD CONSTRAINT fk_requirement_job_application_requirement FOREIGN KEY (requirement_id) REFERENCES recruitment.requirement(id) ON DELETE CASCADE;