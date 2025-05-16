package com.ungs.docsys.services;

import com.ungs.docsys.dtos.RoleResponseDto;

import java.util.List;

public interface RoleService {
    RoleResponseDto getById(Long id);

    List<RoleResponseDto> getAll();
}
