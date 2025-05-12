package com.ungs.docsys.services;

import com.ungs.docsys.dtos.RequirementTypeResponseDto;
import com.ungs.docsys.mappers.RequirementTargetComparatorMapper;
import com.ungs.docsys.mappers.RequirementTypeMapper;
import com.ungs.docsys.repositories.RequirementTargetComparatorRepository;
import com.ungs.docsys.repositories.RequirementTypeRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@AllArgsConstructor
public class RequirementTypeServiceImpl implements RequirementTypeService {
    private final RequirementTypeRepository requirementTypeRepository;
    private final RequirementTypeMapper requirementTypeMapper;

    @Override
    public RequirementTypeResponseDto getById(Long id) {
        return requirementTypeRepository.findById(id)
                .map(requirementTypeMapper::toResponse)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Requirement type not found"));
    }

    @Override
    public List<RequirementTypeResponseDto> getAll() {
        return requirementTypeMapper.toResponses(requirementTypeRepository.findAll());
    }
}
