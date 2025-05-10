package com.ungs.docsys.services;

import com.ungs.docsys.dtos.RequirementTypeResponseDto;

import java.util.List;

public interface RequirementTypeService {
    RequirementTypeResponseDto getById(Long id);
    List<RequirementTypeResponseDto> getAll();
}
