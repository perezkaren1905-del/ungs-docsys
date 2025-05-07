package com.ungs.docsys.repositories;

import com.ungs.docsys.models.RequirementJobApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RequirementJobApplicationRepository extends JpaRepository<RequirementJobApplication, Long> {
}
