package com.ungs.docsys.repositories;

import com.ungs.docsys.models.RequirementType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RequirementTypeRepository extends JpaRepository<RequirementType, Long> {
}
