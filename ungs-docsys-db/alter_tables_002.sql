ALTER TABLE recruitment.requirement DROP CONSTRAINT fk_requirement_requirement_type;
ALTER TABLE recruitment.requirement ADD CONSTRAINT fk_requirement_app_user FOREIGN KEY (user_id_creator) REFERENCES recruitment.app_user(id) ON DELETE CASCADE;
ALTER TABLE recruitment.requirement ADD CONSTRAINT fk_requirement_requirement_type FOREIGN KEY (requirement_type_id) REFERENCES recruitment.requirement_type(id) ON DELETE CASCADE;
ALTER TABLE recruitment.requirement ADD requirement_target_comparator_id int8 not NULL;
ALTER TABLE recruitment.requirement ADD CONSTRAINT fk_requirement_requirement_target_comparator_id FOREIGN KEY (requirement_target_comparator_id) REFERENCES recruitment.requirement_target_comparator(id) ON DELETE CASCADE;
