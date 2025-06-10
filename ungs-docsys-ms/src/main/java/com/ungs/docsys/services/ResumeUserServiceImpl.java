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

import java.util.ArrayList;
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
        AppUser appUser = appUserMapper.toModel(appUserService.getByUsername(appUserClaimDto.getEmail()));

        if (appUser == null) {
            throw new IllegalArgumentException("User not found for email: " + appUserClaimDto.getEmail());
        }

        if (resumeUserRepository.findByAppUserId(appUser.getId()).isPresent()) {
            throw new IllegalStateException("Resume already exists for user ID: " + appUserClaimDto.getId());
        }

        ResumeUser resumeUser = resumeUserMapper.toResumeUser(request);
        resumeUser.setAppUser(appUser);

        if (request.getContact() != null) {
            Contact contact = resumeUserMapper.toContact(request.getContact(), resumeUser);
            resumeUser.setContacts(new ArrayList<>(List.of(contact)));
        } else {
            resumeUser.setContacts(new ArrayList<>());
        }

        List<Education> educations = request.getEducations().stream()
                .map(dto -> resumeUserMapper.toEducation(dto, resumeUser))
                .toList();
        resumeUser.setEducations(new ArrayList<>());
        resumeUser.getEducations().addAll(educations);

        List<Experience> experiences = request.getExperiences().stream()
                .map(dto -> resumeUserMapper.toExperience(dto, resumeUser))
                .toList();
        resumeUser.setExperiences(new ArrayList<>());
        resumeUser.getExperiences().addAll(experiences);

        List<Language> languages = request.getLanguages().stream()
                .map(dto -> resumeUserMapper.toLanguage(dto, resumeUser))
                .toList();
        resumeUser.setLanguages(new ArrayList<>());
        resumeUser.getLanguages().addAll(languages);

        List<TechnicalSkill> technicalSkills = request.getTechnicalSkills().stream()
                .map(dto -> resumeUserMapper.toTechnicalSkill(dto, resumeUser))
                .toList();
        resumeUser.setTechnicalSkills(new ArrayList<>());
        resumeUser.getTechnicalSkills().addAll(technicalSkills);

        List<Certification> certifications = request.getCertifications().stream()
                .map(dto -> resumeUserMapper.toCertification(dto, resumeUser))
                .toList();
        resumeUser.setCertifications(new ArrayList<>());
        resumeUser.getCertifications().addAll(certifications);

        List<ResumeFile> resumeFiles = request.getResumeFiles().stream()
                .map(dto -> resumeUserMapper.toResumeFile(dto, resumeUser))
                .toList();
        resumeUser.setResumeFiles(new ArrayList<>());
        resumeUser.getResumeFiles().addAll(resumeFiles);

        ResumeUser savedResumeUser = resumeUserRepository.save(resumeUser);
        return resumeUserMapper.toResponse(savedResumeUser);
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

    @Override
    public ResumeUserResponseDto getResumeByUserId(Long userId) {
        return null;
    }
}
