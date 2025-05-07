package com.ungs.docsys.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "requirement_job_application", schema = "recruitment")
@Data
public class RequirementJobApplication {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "requirement_id", nullable = false)
    private Requirement requirement;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "job_application_id", nullable = false)
    private JobApplication jobApplication;
}
