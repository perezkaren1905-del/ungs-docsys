package com.ungs.docsys.models;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Table(name = "requirement_target_comparator", schema = "recruitment")
@Data
public class RequirementTargetComparator {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, length = 155)
    private String name;
    @Column(nullable = false, length = 155)
    private String description;
    @OneToMany(mappedBy = "requirementTargetComparator", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Requirement> requirements;
}
