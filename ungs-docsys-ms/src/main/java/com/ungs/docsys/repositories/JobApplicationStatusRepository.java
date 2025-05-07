package com.ungs.docsys.repositories;

import com.ungs.docsys.models.JobApplicationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobApplicationStatusRepository extends JpaRepository<JobApplicationStatus, Long>  {
}
