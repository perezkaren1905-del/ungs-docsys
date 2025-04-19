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
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "role_id", nullable = false)
    private Role role;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "permission", nullable = false)
    private Permission permission;
}
