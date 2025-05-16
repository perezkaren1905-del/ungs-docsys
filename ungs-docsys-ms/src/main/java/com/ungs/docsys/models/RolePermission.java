package com.ungs.docsys.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "role_permission", schema = "recruitment")
@Data
public class RolePermission {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "role_id", nullable = false)
    private Role role;
    @ManyToOne
    @JoinColumn(name = "permission", nullable = false)
    private Permission permission;
}
