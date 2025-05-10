package com.ungs.docsys.models;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Table(name = "job_application_status", schema = "recruitment")
@Data
public class JobApplicationStatus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, length = 100)
    private String name;
    @Column(nullable = true, length = 255)
    private String description;
    @OneToMany(mappedBy = "jobApplicationStatus", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<JobApplication> jobApplications;
}
