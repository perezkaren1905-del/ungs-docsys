package com.ungs.docsys.services;

import com.ungs.docsys.dtos.RoleResponseDto;
import com.ungs.docsys.models.Role;

import java.util.List;

public interface RoleService {
    Role findById(Long id);
    RoleResponseDto getById(Long id);
    List<RoleResponseDto> getAll();
}
