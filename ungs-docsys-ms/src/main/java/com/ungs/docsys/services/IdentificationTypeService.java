package com.ungs.docsys.services;

import com.ungs.docsys.dtos.IdentificationTypeResponseDto;

import java.util.List;

public interface IdentificationTypeService {
    IdentificationTypeResponseDto getById(Long id);
    List<IdentificationTypeResponseDto> getAll();
}
