package com.ungs.docsys.mappers;

import com.ungs.docsys.dtos.DictamenDataResponseDto;
import com.ungs.docsys.models.DictamenData;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface DictamenDataMapper {
    DictamenDataMapper INSTANCE = Mappers.getMapper(DictamenDataMapper.class);

    DictamenDataResponseDto toResponse(DictamenData modelExample);

    List<DictamenDataResponseDto> toResponses(List<DictamenData> dictamenDatas);
}
