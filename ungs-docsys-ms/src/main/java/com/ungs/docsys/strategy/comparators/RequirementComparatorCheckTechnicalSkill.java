package com.ungs.docsys.strategy.comparators;

import com.ungs.docsys.components.ExpectedValueComparatorParserComponent;
import com.ungs.docsys.dtos.ExpectedValueComparatorDto;
import com.ungs.docsys.models.Requirement;
import com.ungs.docsys.repositories.TechnicalSkillRepository;
import com.ungs.docsys.strategy.RequirementComparatorCheckStrategy;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class RequirementComparatorCheckTechnicalSkill implements RequirementComparatorCheckStrategy {

    private final TechnicalSkillRepository technicalSkillRepository;
    private final ExpectedValueComparatorParserComponent expectedValueComparatorParserComponent;

    @Override
    public boolean isApplied(Requirement requirement, Long resumeUserId) {
        final ExpectedValueComparatorDto expectedValueComparatorDto = expectedValueComparatorParserComponent.parse(requirement.getExpectedValue());
        return expectedValueComparatorDto.getStringValues().stream()
                .anyMatch(value -> !technicalSkillRepository
                        .findByResumeUserIdAndNameLikeIgnoreCase(resumeUserId, value)
                        .isEmpty());
    }
}
