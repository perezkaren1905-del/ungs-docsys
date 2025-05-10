package com.ungs.docsys.models;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Table(name = "job_application_period", schema = "recruitment")
@Data
public class JobApplicationPeriod {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, length = 100)
    private String code;
    @Column(nullable = true, length = 255)
    private String description;
    @OneToMany(mappedBy = "jobApplicationPeriod", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<JobApplication> jobApplications;
}
