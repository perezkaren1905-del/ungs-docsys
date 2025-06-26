package com.ungs.docsys.repositories;

import com.ungs.docsys.models.JobApplicationResumeUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobApplicationResumeUserRepository extends JpaRepository<JobApplicationResumeUser, Long> {
}
