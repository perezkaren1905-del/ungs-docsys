package com.ungs.docsys.repositories;

import com.ungs.docsys.models.AppUser;
import com.ungs.docsys.models.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRoleRepository extends JpaRepository<UserRole, Long> {
    List<UserRole> getByAppUser(AppUser appUser);
}
