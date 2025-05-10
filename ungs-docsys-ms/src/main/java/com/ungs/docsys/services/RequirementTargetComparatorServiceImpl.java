package com.ungs.docsys.services;

import com.ungs.docsys.dtos.RequirementTargetComparatorResponseDto;
import com.ungs.docsys.mappers.IdentificationTypeMapper;
import com.ungs.docsys.mappers.RequirementTargetComparatorMapper;
import com.ungs.docsys.mappers.RequirementTypeMapper;
import com.ungs.docsys.repositories.IdentificationTypeRepository;
import com.ungs.docsys.repositories.RequirementTargetComparatorRepository;
import com.ungs.docsys.repositories.RequirementTypeRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@AllArgsConstructor
public class RequirementTargetComparatorServiceImpl implements  RequirementTargetComparatorService {
    private final RequirementTargetComparatorRepository requirementTargetComparatorRepository;
    private final RequirementTargetComparatorMapper requirementTargetComparatorMapper;

    @Override
    public RequirementTargetComparatorResponseDto getById(Long id) {
        return requirementTargetComparatorRepository.findById(id)
                .map(requirementTargetComparatorMapper::toResponse)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Requirement target comparator not found"));
    }

    @Override
    public List<RequirementTargetComparatorResponseDto> getAll() {
        return requirementTargetComparatorMapper.toResponses(requirementTargetComparatorRepository.findAll());
    }
}
