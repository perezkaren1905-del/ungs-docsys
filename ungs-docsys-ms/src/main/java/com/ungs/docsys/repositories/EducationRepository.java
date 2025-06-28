package com.ungs.docsys.repositories;

import com.ungs.docsys.models.Education;
import com.ungs.docsys.models.Language;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EducationRepository extends JpaRepository<Education, Long> {
    @Query("SELECT e FROM Education e WHERE e.resumeUser.id = :resumeUserId AND LOWER(e.degree) LIKE LOWER(CONCAT('%', :degree, '%'))")
    List<Education> findByResumeUserIdAndDegreeLikeIgnoreCase(
            @Param("resumeUserId") Long resumeUserId,
            @Param("degree") String degree
    );
}
