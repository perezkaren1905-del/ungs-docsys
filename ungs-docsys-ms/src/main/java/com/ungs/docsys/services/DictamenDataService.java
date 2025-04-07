package com.ungs.docsys.services;

import com.ungs.docsys.dtos.DictamenDataResponseDto;

import java.util.List;

public interface DictamenDataService {
    public DictamenDataResponseDto getById(Long id);
    public List<DictamenDataResponseDto> getAll();
}
