package com.ungs.docsys.services;

import com.ungs.docsys.dtos.RoleResponseDto;
import com.ungs.docsys.mappers.RoleMapper;
import com.ungs.docsys.repositories.RoleRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@AllArgsConstructor
public class RoleServiceImpl implements RoleService {
    private final RoleRepository roleRepository;
    private final RoleMapper roleMapper;

    @Override
    public RoleResponseDto getById(Long id) {
        return roleRepository.findById(id)
                .map(roleMapper::toResponse)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Role not found"));
    }

    @Override
    public List<RoleResponseDto> getAll() {
        return roleMapper.toResponses(roleRepository.findAll());
    }
}
