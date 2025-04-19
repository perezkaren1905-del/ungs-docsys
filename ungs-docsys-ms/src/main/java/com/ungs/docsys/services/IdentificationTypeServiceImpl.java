package com.ungs.docsys.services;

import com.ungs.docsys.dtos.IdentificationTypeResponseDto;
import com.ungs.docsys.mappers.IdentificationTypeMapper;
import com.ungs.docsys.models.IdentificationType;
import com.ungs.docsys.repositories.IdentificationTypeRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class IdentificationTypeServiceImpl implements IdentificationTypeService {
    private final IdentificationTypeRepository identificationTypeRepository;
    private final IdentificationTypeMapper identificationTypeMapper;

    @Override
    public IdentificationTypeResponseDto getById(Long id) {
        final IdentificationType identificationType = identificationTypeRepository.findById(id).get();
        final IdentificationTypeResponseDto identificationTypeResponseDto = identificationTypeMapper.toResponse(identificationType);
        return identificationTypeRepository.findById(id)
                .map(identificationTypeMapper::toResponse)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Identification type not found"));
    }

    @Override
    public List<IdentificationTypeResponseDto> getAll() {
        return identificationTypeMapper.toResponses(identificationTypeRepository.findAll());
    }
}
