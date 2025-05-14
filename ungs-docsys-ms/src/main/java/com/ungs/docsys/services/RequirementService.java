package com.ungs.docsys.services;

import com.ungs.docsys.dtos.AppUserClaimDto;
import com.ungs.docsys.dtos.RequirementRequestDto;
import com.ungs.docsys.dtos.RequirementResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface RequirementService {
    RequirementResponseDto getById(Long id);
    Page<RequirementResponseDto> getByParams(Pageable pageable);
    RequirementResponseDto save(RequirementRequestDto requirementRequestDto, AppUserClaimDto appUserClaimDto);
    RequirementResponseDto partiallyUpdate(RequirementRequestDto requirementRequestDto, Long id, AppUserClaimDto appUserClaimDto);
}
