package com.ungs.docsys.repositories;

import com.ungs.docsys.models.IdentificationType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IdentificationTypeRepository extends JpaRepository<IdentificationType, Long> {
}
