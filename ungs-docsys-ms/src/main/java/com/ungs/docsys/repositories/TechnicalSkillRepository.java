package com.ungs.docsys.repositories;

import com.ungs.docsys.models.TechnicalSkill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TechnicalSkillRepository extends JpaRepository<TechnicalSkill, Long> {

    @Query("SELECT t FROM TechnicalSkill t WHERE t.resumeUser.id = :resumeUserId AND LOWER(t.name) LIKE LOWER(CONCAT('%', :name, '%'))")
    List<TechnicalSkill> findByResumeUserIdAndNameLikeIgnoreCase(
            @Param("resumeUserId") Long resumeUserId,
            @Param("name") String name
    );
}
