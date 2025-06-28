package com.ungs.docsys.repositories;

import com.ungs.docsys.models.JobApplicationResumeUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobApplicationResumeUserRepository extends JpaRepository<JobApplicationResumeUser, Long>,
        JpaSpecificationExecutor<JobApplicationResumeUser> {
    List<JobApplicationResumeUser> findAllByJobApplicationId(Long jobApplicationId);
}
