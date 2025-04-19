package com.ungs.docsys.services;

import com.ungs.docsys.dtos.PermissionResponseDto;
import com.ungs.docsys.mappers.PermissionMapper;
import com.ungs.docsys.repositories.PermissionRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@AllArgsConstructor
public class PermissionServiceImpl implements  PermissionService {
    private final PermissionRepository permissionRepository;
    private final PermissionMapper permissionMapper;

    @Override
    public PermissionResponseDto getById(Long id) {
        return permissionRepository.findById(id)
                .map(permissionMapper::toResponse)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Permission not found"));
    }

    @Override
    public List<PermissionResponseDto> getAll() {
        return permissionMapper.toResponses(permissionRepository.findAll());
    }
}
