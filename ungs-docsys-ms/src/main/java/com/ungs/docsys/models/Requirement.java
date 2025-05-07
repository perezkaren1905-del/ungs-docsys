package com.ungs.docsys.models;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "requirement", schema = "recruitment")
@Data
public class Requirement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, length = 500)
    private String description;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "requirement_type_id", nullable = false)
    private RequirementType requirementType;
    @Column(nullable = false, length = 25)
    private String operator;
    @Column(name="expected_value", nullable = false, length = 150)
    private String expectedValue;
    @Column(nullable = false)
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
    @OneToMany(mappedBy = "requirement", cascade = CascadeType.ALL)
    private List<RequirementJobApplication> requirementJobApplications;
}
