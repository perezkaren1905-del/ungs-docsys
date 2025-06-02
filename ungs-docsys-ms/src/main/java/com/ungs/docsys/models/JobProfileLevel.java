package com.ungs.docsys.models;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Table(name = "job_profile_level", schema = "recruitment")
@Data
public class JobProfileLevel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, length = 50, unique = true)
    private String level;
    @Column(nullable = false, length = 150)
    private String description;
    @OneToMany(mappedBy = "jobProfileLevel", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<JobApplication> jobApplications;
}
