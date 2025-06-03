package com.ungs.docsys.repositories;

import com.ungs.docsys.models.ResumeUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResumeUserRepository extends JpaRepository<ResumeUser, Long> {
}
