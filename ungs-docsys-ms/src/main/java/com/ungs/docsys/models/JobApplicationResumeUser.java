package com.ungs.docsys.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "job_application_resume_user", schema = "recruitment")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class JobApplicationResumeUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "job_application_id", nullable = false)
    private JobApplication jobApplication;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "resume_user_id", nullable = false)
    private ResumeUser resumeUser;

    @Column(name = "requirements_global_count")
    private Long requirementGlobalCount;

    @Column(name = "requirements_mandatory_count")
    private Long requirementMandatoryCount;

    @Column(name = "requirements_prefered_count")
    private Long requirementPreferredCount;

    @Column(name = "requirement_global_applied")
    private Long requirementGlobalApplied;

    @Column(name = "requirement_mandatory_applied")
    private Long requirementMandatoryApplied;

    @Column(name = "requirement_prefered_applied")
    private Long requirementPreferredApplied;

    @Column(name = "created_date")
    private LocalDateTime createdDate;

    @Column(name = "updated_date")
    private LocalDateTime updatedDate;

    @PrePersist
    protected void onCreate() {
        this.createdDate = LocalDateTime.now();
        this.updatedDate = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedDate = LocalDateTime.now();
    }
}
