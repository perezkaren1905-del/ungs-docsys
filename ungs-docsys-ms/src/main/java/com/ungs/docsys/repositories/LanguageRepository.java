package com.ungs.docsys.repositories;

import com.ungs.docsys.models.Language;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LanguageRepository extends JpaRepository<Language, Long> {
    @Query("SELECT l FROM Language l WHERE l.resumeUser.id = :resumeUserId AND LOWER(l.language) LIKE LOWER(CONCAT('%', :language, '%'))")
    List<Language> findByResumeUserIdAndLanguageLikeIgnoreCase(
            @Param("resumeUserId") Long resumeUserId,
            @Param("language") String language
    );
}
