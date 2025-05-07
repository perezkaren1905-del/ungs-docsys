package com.ungs.docsys.models;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "job_application", schema = "recruitment")
@Data
public class JobApplication {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, length = 36)
    private String code;
    @Column(nullable = false, length = 150)
    private String title;
    @Column(nullable = false, length = 5000)
    private String description;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "job_application_status_id", nullable = false)
    private JobApplicationStatus jobApplicationStatus;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "job_application_period_id", nullable = false)
    private JobApplicationPeriod jobApplicationPeriod;
    @Column(name="min_approvers", nullable = true)
    private Long minApprovers;
    @Column(nullable = false, length = 500)
    private String reason;
    @Column(name="year_period", nullable = false, length = 5000)
    private Long yearPeriod;
    @Column(nullable = false, length = 5000)
    private Boolean active;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id_creator", nullable = false)
    private AppUser appUser;
    @CreatedDate
    @Column(name = "created_date", updatable = false)
    private LocalDateTime createdDate;
    @LastModifiedDate
    @Column(name = "updated_date")
    private LocalDateTime updatedDate;
    @OneToMany(mappedBy = "jobApplication", cascade = CascadeType.ALL)
    private List<RequirementJobApplication> requirementJobApplications;
}
