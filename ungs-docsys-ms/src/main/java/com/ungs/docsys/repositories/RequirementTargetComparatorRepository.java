package com.ungs.docsys.repositories;

import com.ungs.docsys.models.RequirementTargetComparator;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RequirementTargetComparatorRepository extends JpaRepository<RequirementTargetComparator, Long> {
}
