package com.ungs.docsys.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "dictamen_data", schema = "dictamen")
@Data
public class DictamenData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, length = 30)
    private String name;
    @Column(nullable = true, length = 255)
    private String data;
}
