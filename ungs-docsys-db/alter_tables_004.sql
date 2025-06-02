ALTER TABLE recruitment.job_application ADD job_profile_level_id int8 NULL;
ALTER TABLE recruitment.job_application ADD CONSTRAINT fk_job_application_job_profile_level FOREIGN KEY (job_profile_level_id) REFERENCES recruitment.job_profile_level(id) ON DELETE CASCADE;
