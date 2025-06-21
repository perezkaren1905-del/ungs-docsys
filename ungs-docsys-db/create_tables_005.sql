CREATE TABLE recruitment.job_application_resume_user (
	id bigserial NOT NULL,
	job_application_id int8 not NULL,
	resume_user_id int8 NOT NULL,
	requirements_global_count int8 not null,
	requirements_mandatory_count int8 not null,
	requirements_prefered_count int8 not null,
	requirement_global_applied int8 not null,
	requirement_mandatory_applied int8 not null,
	requirement_prefered_applied int8 not null,
	created_date timestamp NULL,
	updated_date timestamp NULL,
	CONSTRAINT job_application_resume_user_pkey PRIMARY KEY (id)
);