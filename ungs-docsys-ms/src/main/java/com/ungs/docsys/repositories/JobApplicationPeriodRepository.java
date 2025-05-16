package com.ungs.docsys.repositories;

import com.ungs.docsys.models.JobApplicationPeriod;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobApplicationPeriodRepository extends JpaRepository<JobApplicationPeriod, Long> {
}
