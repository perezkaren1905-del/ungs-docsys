CREATE TABLE recruitment.job_profile_level (
	id bigserial NOT NULL,
	level varchar(50) not null UNIQUE,
	description varchar(150) NOT null,
	CONSTRAINT job_profile_level_pkey PRIMARY KEY (id)
);