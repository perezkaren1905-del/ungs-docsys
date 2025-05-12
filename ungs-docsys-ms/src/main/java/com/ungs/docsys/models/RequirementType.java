package com.ungs.docsys.models;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Table(name = "requirement_type", schema = "recruitment")
@Data
public class RequirementType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, length = 100)
    private String name;
    @Column(nullable = true, length = 255)
    private String description;
    @OneToMany(mappedBy = "requirementType", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Requirement> requirements;
}