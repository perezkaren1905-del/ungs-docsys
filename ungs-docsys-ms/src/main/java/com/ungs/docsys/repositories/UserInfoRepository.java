package com.ungs.docsys.repositories;

import com.ungs.docsys.models.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserInfoRepository extends JpaRepository<UserInfo, Long> {
    Optional<UserInfo> findByAppUser_Email(String email);
}
