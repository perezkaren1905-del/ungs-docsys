package com.ungs.docsys.models;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "loging_history", schema = "recruitment")
@Data
public class LogingHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private AppUser appUser;
    @Column(name="login_time", nullable = false)
    private LocalDateTime loginTime;

    @PrePersist
    private void onCreate() {
        this.loginTime = LocalDateTime.now();
    }
}
