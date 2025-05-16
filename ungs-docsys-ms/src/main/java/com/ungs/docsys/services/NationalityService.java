package com.ungs.docsys.services;

import com.ungs.docsys.dtos.NationalityResponseDto;

import java.util.List;

public interface NationalityService {
    NationalityResponseDto getById(Long id);
    List<NationalityResponseDto> getAll();
}
