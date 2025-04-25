package com.ungs.docsys.models;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Table(name = "identification_type", schema = "recruitment")
@Data
public class IdentificationType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, length = 25)
    private String code;
    @Column(nullable = false, length = 100)
    private String description;
    @OneToMany(mappedBy = "identificationType", cascade = CascadeType.ALL)
    private List<UserInfo> userInfos;
}
