package com.ungs.docsys.repositories;

import com.ungs.docsys.models.Nationality;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NationalityRepository extends JpaRepository<Nationality, Long> {
}
