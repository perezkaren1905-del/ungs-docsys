package com.ungs.docsys.models;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Table(name = "role", schema = "recruitment")
@Data
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, length = 100)
    private String name;
    @Column(nullable = false, length = 255)
    private String description;
    @OneToMany(mappedBy = "role", cascade = CascadeType.ALL)
    private List<UserRole> userRoles;
    @OneToMany(mappedBy = "role", cascade = CascadeType.ALL)
    private List<RolePermission> rolePermissions;
}
