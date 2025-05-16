package com.ungs.docsys.services;

import com.ungs.docsys.dtos.RequirementTargetComparatorResponseDto;

import java.util.List;

public interface RequirementTargetComparatorService {
    RequirementTargetComparatorResponseDto getById(Long id);
    List<RequirementTargetComparatorResponseDto> getAll();
}
