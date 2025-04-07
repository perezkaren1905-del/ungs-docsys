package com.ungs.docsys.repositories;

import com.ungs.docsys.models.DictamenData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DictamenDataRepository extends JpaRepository<DictamenData, Long> {
}
