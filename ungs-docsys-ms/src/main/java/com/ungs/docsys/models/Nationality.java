package com.ungs.docsys.models;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Table(name = "nationality", schema = "recruitment")
@Data
public class Nationality {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, length = 3)
    private String code;
    @Column(nullable = false, length = 150)
    private String description;
    @Column(name="iso_2", nullable = false, length = 2)
    private String iso2;
    @Column(name="iso_3", nullable = false, length = 3)
    private String iso3;
    @OneToMany(mappedBy = "nationality", cascade = CascadeType.ALL)
    private List<UserInfo> userInfos;
}
