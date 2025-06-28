package com.ungs.docsys.services;

import com.ungs.docsys.dtos.AppUserClaimDto;
import com.ungs.docsys.dtos.ResumeUserRequestDto;
import com.ungs.docsys.dtos.ResumeUserResponseDto;
import com.ungs.docsys.exception.BusinessException;
import com.ungs.docsys.mappers.AppUserMapper;
import com.ungs.docsys.mappers.ResumeUserMapper;
import com.ungs.docsys.models.*;
import com.ungs.docsys.repositories.*;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.function.Consumer;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ResumeUserServiceImpl implements ResumeUserService {

    private final ResumeUserMapper resumeUserMapper;
    private final AppUserMapper appUserMapper;

    private final AppUserService appUserService;
    private final ResumeUserRepository resumeUserRepository;

    @Override
    @Transactional
    public ResumeUserResponseDto save(ResumeUserRequestDto request, AppUserClaimDto appUserClaimDto) {
        AppUser appUser = appUserMapper.toModel(appUserService.getByUsername(appUserClaimDto.getEmail()));

        if (appUser == null) {
            throw new BusinessException(HttpStatus.NOT_FOUND, "User not found for email: " + appUserClaimDto.getEmail());
        }

        ResumeUser resumeUser = resumeUserMapper.toResumeUser(request);
        resumeUser.setAppUser(appUser);

        resumeUser.setContacts(
                Optional.ofNullable(request.getContact())
                        .map(c -> new ArrayList<>(List.of(resumeUserMapper.toContact(c, resumeUser))))
                        .orElseGet(ArrayList::new)
        );

        final Optional<ResumeUser> currentResumeUserOpt = resumeUserRepository.findAllByAppUserIdAndIsCurrent(appUser.getId(), Boolean.TRUE)
                        .stream().findFirst();
        if(currentResumeUserOpt.isPresent()) {
            final ResumeUser currentResumeUser = currentResumeUserOpt.get();
            currentResumeUser.setIsCurrent(Boolean.FALSE);
            resumeUserRepository.save(currentResumeUser);
        }

        mapAndSetList(request.getEducations(), dto -> resumeUserMapper.toEducation(dto, resumeUser), resumeUser::setEducations);
        mapAndSetList(request.getExperiences(), dto -> resumeUserMapper.toExperience(dto, resumeUser), resumeUser::setExperiences);
        mapAndSetList(request.getLanguages(), dto -> resumeUserMapper.toLanguage(dto, resumeUser), resumeUser::setLanguages);
        mapAndSetList(request.getTechnicalSkills(), dto -> resumeUserMapper.toTechnicalSkill(dto, resumeUser), resumeUser::setTechnicalSkills);
        mapAndSetList(request.getCertifications(), dto -> resumeUserMapper.toCertification(dto, resumeUser), resumeUser::setCertifications);
        mapAndSetList(request.getResumeFiles(), dto -> resumeUserMapper.toResumeFile(dto, resumeUser), resumeUser::setResumeFiles);
        resumeUser.setIsCurrent(Boolean.TRUE);
        return resumeUserMapper.toResponse(resumeUserRepository.save(resumeUser));
    }

    private <D, E> void mapAndSetList(List<D> dtos, Function<D, E> mapper, Consumer<List<E>> setter) {
        setter.accept(dtos == null ? List.of() : dtos.stream().map(mapper).toList());
    }

    @Override
    public ResumeUserResponseDto getById(Long id) {
        ResumeUser resumeUser = resumeUserRepository.findById(id)
                .orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "Resume not found"));
        return resumeUserMapper.toResponse(resumeUser);
    }

    @Override
    public List<ResumeUserResponseDto> getByParams(Boolean isCurrent, AppUserClaimDto appUserClaimDto) {
        return resumeUserRepository.findAllByAppUserIdAndIsCurrent(appUserClaimDto.getId(), isCurrent)
                .stream()
                .map(resumeUserMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public ResumeUserResponseDto partiallyUpdate(ResumeUserRequestDto resumeUserRequestDto, Long resumeUserId, AppUserClaimDto appUserClaimDto) {
        return null;
    }

    @Override
    public ResumeUserResponseDto getResumeByUserId(Long userId) {
        return null;
    }
}
