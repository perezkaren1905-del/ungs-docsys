package com.ungs.docsys.models;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "app_user", schema = "recruitment")
@Data
public class AppUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, length = 100)
    private String email;
    @Column(nullable = false, length = 255)
    private String passwordHash;
    @Column(nullable = false)
    private Boolean active;
    @CreatedDate
    @Column(name = "created_date", updatable = false)
    private LocalDateTime createdDate;
    @LastModifiedDate
    @Column(name = "updated_date")
    private LocalDateTime updatedDate;
    @OneToMany(mappedBy = "appUser", cascade = CascadeType.ALL)
    private List<PasswordReset> passwordResets;
    @OneToMany(mappedBy = "appUser", cascade = CascadeType.ALL)
    private List<LogingHistory> logingHistories;
    @OneToMany(mappedBy = "appUser", cascade = CascadeType.ALL)
    private List<UserInfo> userInfos;

    @PrePersist
    private void onCreate() {
        this.createdDate = LocalDateTime.now();
        this.updatedDate = LocalDateTime.now();
        if(Objects.isNull(active)) {
            this.active = Boolean.TRUE;
        }
    }

    @PreUpdate
    private void onUpdate() {
        this.updatedDate = LocalDateTime.now();
    }
}
