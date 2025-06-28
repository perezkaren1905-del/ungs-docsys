package com.ungs.docsys.services;

import com.ungs.docsys.dtos.NationalityResponseDto;
import com.ungs.docsys.exception.BusinessException;
import com.ungs.docsys.mappers.NationalityMapper;
import com.ungs.docsys.repositories.NationalityRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class NationalityServiceImpl implements NationalityService {
    private final NationalityRepository nationalityRepository;
    private final NationalityMapper nationalityMapper;

    @Override
    public NationalityResponseDto getById(Long id) {
        return nationalityRepository.findById(id)
                .map(nationalityMapper::toResponse)
                .orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "Nationality not found"));
    }

    @Override
    public List<NationalityResponseDto> getAll() {
        return nationalityMapper.toResponses(nationalityRepository.findAll());
    }
}
