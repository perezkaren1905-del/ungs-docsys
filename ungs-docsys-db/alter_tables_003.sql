ALTER TABLE recruitment.resume_user ADD CONSTRAINT fk_resume_user_user FOREIGN KEY (user_id) REFERENCES recruitment.app_user(id) ON DELETE CASCADE;
ALTER TABLE recruitment.contact ADD CONSTRAINT fk_contact_resume_user FOREIGN KEY (resume_user_id) REFERENCES recruitment.resume_user(id) ON DELETE CASCADE;
ALTER TABLE recruitment.education ADD CONSTRAINT fk_education_resume_user FOREIGN KEY (resume_user_id) REFERENCES recruitment.resume_user(id) ON DELETE CASCADE;
ALTER TABLE recruitment.experience ADD CONSTRAINT fk_experience_resume_user FOREIGN KEY (resume_user_id) REFERENCES recruitment.resume_user(id) ON DELETE CASCADE;
ALTER TABLE recruitment.technical_skill ADD CONSTRAINT fk_technical_skill_resume_user FOREIGN KEY (resume_user_id) REFERENCES recruitment.resume_user(id) ON DELETE CASCADE;
ALTER TABLE recruitment.certification ADD CONSTRAINT fk_certification_resume_user FOREIGN KEY (resume_user_id) REFERENCES recruitment.resume_user(id) ON DELETE CASCADE;
ALTER TABLE recruitment.language ADD CONSTRAINT fk_language_resume_user FOREIGN KEY (resume_user_id) REFERENCES recruitment.resume_user(id) ON DELETE CASCADE;
ALTER TABLE recruitment.resume_file ADD CONSTRAINT fk_resume_file_resume_user FOREIGN KEY (resume_user_id) REFERENCES recruitment.resume_user(id) ON DELETE CASCADE;