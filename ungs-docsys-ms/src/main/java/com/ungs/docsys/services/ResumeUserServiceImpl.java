package com.ungs.docsys.services;

import com.ungs.docsys.dtos.AppUserClaimDto;
import com.ungs.docsys.dtos.ResumeUserRequestDto;
import com.ungs.docsys.dtos.ResumeUserResponseDto;
import com.ungs.docsys.mappers.AppUserMapper;
import com.ungs.docsys.mappers.ResumeUserMapper;
import com.ungs.docsys.models.*;
import com.ungs.docsys.repositories.*;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ResumeUserServiceImpl implements ResumeUserService {

    private final ResumeUserMapper resumeUserMapper;
    private final AppUserMapper appUserMapper;

    private final AppUserService appUserService;
    private final ResumeUserRepository resumeUserRepository;
    private final ContactRepository contactRepository;
    private final EducationRepository educationRepository;
    private final ExperienceRepository experienceRepository;
    private final LanguageRepository languageRepository;
    private final TechnicalSkillRepository technicalSkillRepository;
    private final CertificationRepository certificationRepository;
    private final ResumeFileRepository resumeFileRepository;

    @Override
    public ResumeUserResponseDto save(ResumeUserRequestDto request, AppUserClaimDto appUserClaimDto) {
        ResumeUser resumeUser = resumeUserMapper.toResumeUser(request);

        AppUser appUser = appUserMapper.toModel(appUserService.getByUsername(appUserClaimDto.getEmail()));
        resumeUser.setAppUser(appUser);

        if (request.getContact() != null) {
            Contact contact = resumeUserMapper.toContact(request.getContact(), resumeUser);
            resumeUser.setContacts(List.of(contact));
        }

        resumeUser.setEducations(request.getEducations().stream()
                .map(dto -> resumeUserMapper.toEducation(dto, resumeUser))
                .collect(Collectors.toList()));

        resumeUser.setExperiences(request.getExperiences().stream()
                .map(dto -> resumeUserMapper.toExperience(dto, resumeUser))
                .collect(Collectors.toList()));

        resumeUser.setLanguages(request.getLanguages().stream()
                .map(dto -> resumeUserMapper.toLanguage(dto, resumeUser))
                .collect(Collectors.toList()));

        resumeUser.setTechnicalSkills(request.getTechnicalSkills().stream()
                .map(dto -> resumeUserMapper.toTechnicalSkill(dto, resumeUser))
                .collect(Collectors.toList()));

        resumeUser.setCertifications(request.getCertifications().stream()
                .map(dto -> resumeUserMapper.toCertification(dto, resumeUser))
                .collect(Collectors.toList()));

        resumeUser.setResumeFiles(request.getResumeFiles().stream()
                .map(dto -> resumeUserMapper.toResumeFile(dto, resumeUser))
                .collect(Collectors.toList()));

        return resumeUserMapper.toResponse(resumeUserRepository.save(resumeUser));
    }

    @Override
    public ResumeUserResponseDto getById(Long resumeUserId) {
        return null;
    }

    @Override
    public Page<ResumeUserRequestDto> getByParams(Pageable pageable) {
        return null;
    }

    @Override
    public ResumeUserResponseDto partiallyUpdate(ResumeUserRequestDto resumeUserRequestDto, Long resumeUserId, AppUserClaimDto appUserClaimDto) {
        return null;
    }
}
