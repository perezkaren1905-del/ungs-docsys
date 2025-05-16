package com.ungs.docsys.services;

import com.ungs.docsys.dtos.PermissionResponseDto;

import java.util.List;

public interface PermissionService {
    PermissionResponseDto getById(Long id);
    List<PermissionResponseDto> getAll();
}
