package com.ungs.docsys.repositories;

import com.ungs.docsys.models.Certification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CertificationRepository extends JpaRepository<Certification, Long> {
    @Query("SELECT c FROM Certification c WHERE c.resumeUser.id = :resumeUserId AND LOWER(c.name) LIKE LOWER(CONCAT('%', :name, '%'))")
    List<Certification> findByResumeUserIdAndNameLikeIgnoreCase(
            @Param("resumeUserId") Long resumeUserId,
            @Param("name") String name
    );
}
