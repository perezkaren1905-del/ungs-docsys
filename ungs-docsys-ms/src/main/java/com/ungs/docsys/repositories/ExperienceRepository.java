package com.ungs.docsys.repositories;

import com.ungs.docsys.models.Experience;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExperienceRepository extends JpaRepository<Experience, Long> {
    @Query("SELECT e FROM Experience e WHERE e.resumeUser.id = :resumeUserId " +
            " AND (" +
            " LOWER(e.jobTitle) LIKE LOWER(CONCAT('%', :value, '%'))" +
            " OR LOWER(e.description) LIKE LOWER(CONCAT('%', :value, '%'))" +
            " )")
    List<Experience> findByResumeUserIdAndJobTitleOrDescriptionLikeIgnoreCase(
            @Param("resumeUserId") Long resumeUserId,
            @Param("value") String value
    );
}
