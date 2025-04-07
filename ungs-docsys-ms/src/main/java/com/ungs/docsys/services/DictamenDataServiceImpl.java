package com.ungs.docsys.services;

import com.ungs.docsys.dtos.DictamenDataResponseDto;
import com.ungs.docsys.mappers.DictamenDataMapper;
import com.ungs.docsys.models.DictamenData;
import com.ungs.docsys.repositories.DictamenDataRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class DictamenDataServiceImpl implements DictamenDataService {
    private DictamenDataRepository dictamenesDataRepository;

    @Override
    public DictamenDataResponseDto getById(Long id) {
        final Optional<DictamenData> dictamenOpt = dictamenesDataRepository.findById(id);
        if(dictamenOpt.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Dictamen no encontrado");
        }
        return DictamenDataMapper.INSTANCE.toResponse(dictamenOpt.get());
    }

    @Override
    public List<DictamenDataResponseDto> getAll() {
        final List<DictamenData> dictamenDataList = dictamenesDataRepository.findAll();
        return DictamenDataMapper.INSTANCE.toResponses(dictamenDataList);
    }
}
