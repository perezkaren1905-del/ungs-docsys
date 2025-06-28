package com.ungs.docsys.repositories;

import com.ungs.docsys.models.JobApplicationResumeUser;
import org.springframework.data.jpa.domain.Specification;

public class JobApplicationResumeUserSpecification {

    public static Specification<JobApplicationResumeUser> hasJobApplicationId(Long jobApplicationId) {
        return (root, query, criteriaBuilder) -> jobApplicationId == null ? null :
                criteriaBuilder.equal(root.get("jobApplication").get("id"), jobApplicationId);
    }

    public static Specification<JobApplicationResumeUser> hasResumeUserId(Long resumeUserId) {
        return (root, query, criteriaBuilder) -> resumeUserId == null ? null :
                criteriaBuilder.equal(root.get("resumeUser").get("id"), resumeUserId);
    }
}
