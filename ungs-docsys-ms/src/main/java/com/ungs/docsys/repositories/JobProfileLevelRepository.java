package com.ungs.docsys.repositories;

import com.ungs.docsys.models.JobProfileLevel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobProfileLevelRepository extends JpaRepository<JobProfileLevel, Long> {
}
