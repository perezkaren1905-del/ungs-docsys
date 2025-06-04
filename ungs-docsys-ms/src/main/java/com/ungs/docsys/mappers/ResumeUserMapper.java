package com.ungs.docsys.mappers;

import com.ungs.docsys.dtos.*;
import com.ungs.docsys.models.*;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.NullValuePropertyMappingStrategy;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public abstract class ResumeUserMapper {

    public abstract ResumeUser toResumeUser(ResumeUserRequestDto dto);

    @Mapping(target = "resumeUser", source = "resumeUser")
    public abstract Certification toCertification(CertificationRequestDto dto, ResumeUser resumeUser);

    @Mapping(target = "resumeUser", source = "resumeUser")
    public abstract Contact toContact(ContactRequestDto dto, ResumeUser resumeUser);

    @Mapping(target = "resumeUser", source = "resumeUser")
    public abstract Education toEducation(EducationRequestDto dto, ResumeUser resumeUser);

    @Mapping(target = "resumeUser", source = "resumeUser")
    public abstract Experience toExperience(ExperienceRequestDto dto, ResumeUser resumeUser);

    @Mapping(target = "resumeUser", source = "resumeUser")
    public abstract Language toLanguage(LanguageRequestDto dto, ResumeUser resumeUser);

    @Mapping(target = "resumeUser", source = "resumeUser")
    public abstract ResumeFile toResumeFile(ResumeFileRequestDto dto, ResumeUser resumeUser);

    @Mapping(target = "resumeUser", source = "resumeUser")
    public abstract TechnicalSkill toTechnicalSkill(TechnicalSkillRequestDto dto, ResumeUser resumeUser);

    public List<Education> toEducationList(List<EducationRequestDto> dtos, ResumeUser resumeUser) {
        if (dtos == null) return null;
        return dtos.stream()
                .map(dto -> toEducation(dto, resumeUser))
                .collect(Collectors.toList());
    }

    public List<Experience> toExperienceList(List<ExperienceRequestDto> dtos, ResumeUser resumeUser) {
        if (dtos == null) return null;
        return dtos.stream()
                .map(dto -> toExperience(dto, resumeUser))
                .collect(Collectors.toList());
    }

    public List<Certification> toCertificationList(List<CertificationRequestDto> dtos, ResumeUser resumeUser) {
        if (dtos == null) return null;
        return dtos.stream()
                .map(dto -> toCertification(dto, resumeUser))
                .collect(Collectors.toList());
    }

    public List<Language> toLanguageList(List<LanguageRequestDto> dtos, ResumeUser resumeUser) {
        if (dtos == null) return null;
        return dtos.stream()
                .map(dto -> toLanguage(dto, resumeUser))
                .collect(Collectors.toList());
    }

    public List<ResumeFile> toResumeFileList(List<ResumeFileRequestDto> dtos, ResumeUser resumeUser) {
        if (dtos == null) return null;
        return dtos.stream()
                .map(dto -> toResumeFile(dto, resumeUser))
                .collect(Collectors.toList());
    }

    public List<TechnicalSkill> toTechnicalSkillList(List<TechnicalSkillRequestDto> dtos, ResumeUser resumeUser) {
        if (dtos == null) return null;
        return dtos.stream()
                .map(dto -> toTechnicalSkill(dto, resumeUser))
                .collect(Collectors.toList());
    }

    @Mapping(target = "userId", source = "appUser.id")
    @Mapping(target = "contact", expression = "java(toContactResponse(resumeUser.getContacts()))")
    @Mapping(target = "educations", expression = "java(toEducationResponseList(resumeUser.getEducations()))")
    @Mapping(target = "experiences", expression = "java(toExperienceResponseList(resumeUser.getExperiences()))")
    @Mapping(target = "languages", expression = "java(toLanguageResponseList(resumeUser.getLanguages()))")
    @Mapping(target = "technicalSkills", expression = "java(toTechnicalSkillResponseList(resumeUser.getTechnicalSkills()))")
    @Mapping(target = "certifications", expression = "java(toCertificationResponseList(resumeUser.getCertifications()))")
    @Mapping(target = "files", expression = "java(toResumeFileResponseList(resumeUser.getResumeFiles()))")
    public abstract ResumeUserResponseDto toResponse(ResumeUser resumeUser);

    public ContactResponseDto toContactResponse(List<Contact> contacts) {
        if (contacts == null || contacts.isEmpty()) return null;
        return toContactResponse(contacts.get(0));
    }

    public abstract ContactResponseDto toContactResponse(Contact contact);

    public abstract EducationResponseDto toEducationResponse(Education education);

    public List<EducationResponseDto> toEducationResponseList(List<Education> educations) {
        if (educations == null) return null;
        return educations.stream()
                .map(this::toEducationResponse)
                .collect(Collectors.toList());
    }

    public abstract ExperienceResponseDto toExperienceResponse(Experience experience);

    public List<ExperienceResponseDto> toExperienceResponseList(List<Experience> experiences) {
        if (experiences == null) return null;
        return experiences.stream()
                .map(this::toExperienceResponse)
                .collect(Collectors.toList());
    }

    public abstract CertificationResponseDto toCertificationResponse(Certification certification);

    public List<CertificationResponseDto> toCertificationResponseList(List<Certification> certifications) {
        if (certifications == null) return null;
        return certifications.stream()
                .map(this::toCertificationResponse)
                .collect(Collectors.toList());
    }

    public abstract LanguageResponseDto toLanguageResponse(Language language);

    public List<LanguageResponseDto> toLanguageResponseList(List<Language> languages) {
        if (languages == null) return null;
        return languages.stream()
                .map(this::toLanguageResponse)
                .collect(Collectors.toList());
    }

    public abstract ResumeFileResponseDto toResumeFileResponse(ResumeFile resumeFile);

    public List<ResumeFileResponseDto> toResumeFileResponseList(List<ResumeFile> resumeFiles) {
        if (resumeFiles == null) return null;
        return resumeFiles.stream()
                .map(this::toResumeFileResponse)
                .collect(Collectors.toList());
    }

    public abstract TechnicalSkillResponseDto toTechnicalSkillResponse(TechnicalSkill skill);

    public List<TechnicalSkillResponseDto> toTechnicalSkillResponseList(List<TechnicalSkill> skills) {
        if (skills == null) return null;
        return skills.stream()
                .map(this::toTechnicalSkillResponse)
                .collect(Collectors.toList());
    }

}
