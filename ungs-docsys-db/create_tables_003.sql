CREATE TABLE recruitment.resume_user (
	id bigserial NOT NULL,
	user_id int8 NOT NULL,
	created_date timestamp NULL,
	updated_date timestamp NULL,
	is_current bool NOT NULL,
	CONSTRAINT resume_user_pkey PRIMARY KEY (id)
);

CREATE TABLE recruitment.contact (
	id bigserial NOT NULL,
	email varchar(100) null,
	phone varchar(20) null,
	address varchar(150),
	linkedin varchar(100) null,
	resume_user_id int8 NOT NULL,
	created_date timestamp NULL,
	updated_date timestamp NULL,
	CONSTRAINT contact_pkey PRIMARY KEY (id)
);

CREATE TABLE recruitment.education (
	id bigserial NOT NULL,
	institute_name varchar(150) null,
	degree_level varchar(20) null,
	degree varchar(150),
	field_of_study varchar(150) null,
	resume_user_id int8 NOT NULL,
	created_date timestamp NULL,
	updated_date timestamp NULL,
	CONSTRAINT education_pkey PRIMARY KEY (id)
);

CREATE TABLE recruitment.experience (
	id bigserial NOT NULL,
	job_title varchar(150) null,
	company_name varchar(150) null,
	description varchar(5000),
	start_date timestamp null,
	end_date timestamp null,
	is_current bool null,
	resume_user_id int8 NOT NULL,
	created_date timestamp NULL,
	updated_date timestamp NULL,
	CONSTRAINT experience_pkey PRIMARY KEY (id)
);

CREATE TABLE recruitment.technical_skill (
	id bigserial NOT NULL,
	name varchar(150) null,
	level varchar(50) null,
	resume_user_id int8 NOT NULL,
	created_date timestamp NULL,
	updated_date timestamp NULL,
	CONSTRAINT technical_skill_pkey PRIMARY KEY (id)
);

CREATE TABLE recruitment.certification (
	id bigserial NOT NULL,
	name varchar(150) null,
	issue_date timestamp null,
	expiration_date timestamp null,
	certification_url varchar(250) null,
	resume_user_id int8 NOT NULL,
	created_date timestamp NULL,
	updated_date timestamp NULL,
	CONSTRAINT certification_pkey PRIMARY KEY (id)
);
CREATE TABLE recruitment.language (
	id bigserial NOT NULL,
	language varchar(50) null,
	level varchar(50) null,
	resume_user_id int8 NOT NULL,
	created_date timestamp NULL,
	updated_date timestamp NULL,
	CONSTRAINT language_pkey PRIMARY KEY (id)
);

CREATE TABLE recruitment.resume_file (
	id bigserial NOT NULL,
	file_binary varchar(5000) null,
	resume_user_id int8 NOT NULL,
	created_date timestamp NULL,
	updated_date timestamp NULL,
	CONSTRAINT resume_file_pkey PRIMARY KEY (id)
);
