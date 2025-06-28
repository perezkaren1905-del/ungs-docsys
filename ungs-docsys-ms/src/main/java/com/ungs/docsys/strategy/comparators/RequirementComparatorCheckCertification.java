package com.ungs.docsys.strategy.comparators;

import com.ungs.docsys.components.ExpectedValueComparatorParserComponent;
import com.ungs.docsys.dtos.ExpectedValueComparatorDto;
import com.ungs.docsys.models.Requirement;
import com.ungs.docsys.repositories.CertificationRepository;
import com.ungs.docsys.strategy.RequirementComparatorCheckStrategy;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class RequirementComparatorCheckCertification implements RequirementComparatorCheckStrategy {

    private final CertificationRepository certificationRepository;
    private final ExpectedValueComparatorParserComponent expectedValueComparatorParserComponent;

    @Override
    public boolean isApplied(Requirement requirement, Long resumeUserId) {
        final ExpectedValueComparatorDto expectedValueComparatorDto = expectedValueComparatorParserComponent.parse(requirement.getExpectedValue());
        return expectedValueComparatorDto.getStringValues().stream()
                .anyMatch(value -> !certificationRepository
                        .findByResumeUserIdAndNameLikeIgnoreCase(resumeUserId, value)
                        .isEmpty());
    }
}
