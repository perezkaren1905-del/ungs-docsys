package com.ungs.docsys.strategy.comparators;

import com.ungs.docsys.components.ExpectedValueComparatorParserComponent;
import com.ungs.docsys.dtos.ExpectedValueComparatorDto;
import com.ungs.docsys.enums.OperatorsEnum;
import com.ungs.docsys.models.Experience;
import com.ungs.docsys.models.Requirement;
import com.ungs.docsys.repositories.ExperienceRepository;
import com.ungs.docsys.strategy.RequirementComparatorCheckStrategy;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Objects;

@Component
@AllArgsConstructor
public class RequirementComparatorCheckExperience implements RequirementComparatorCheckStrategy {

    private final ExperienceRepository experienceRepository;
    private final ExpectedValueComparatorParserComponent expectedValueComparatorParserComponent;

    @Override
    public boolean isApplied(Requirement requirement, Long resumeUserId) {
        final ExpectedValueComparatorDto expectedValueComparatorDto = expectedValueComparatorParserComponent.parse(requirement.getExpectedValue());

        if(Objects.isNull(expectedValueComparatorDto.getNumericValue())) {
            return false;
        }
        if(requirement.getOperator().equals(OperatorsEnum.INCLUDES)) {
            return expectedValueComparatorDto.getStringValues().stream()
                    .anyMatch(value -> !experienceRepository
                            .findByResumeUserIdAndJobTitleOrDescriptionLikeIgnoreCase(resumeUserId, value)
                            .isEmpty());
        } else {
            return isAppliedNumericComparator(requirement, expectedValueComparatorDto, resumeUserId);
        }
    }

    private boolean isAppliedNumericComparator(Requirement requirement, ExpectedValueComparatorDto expectedValueComparatorDto, Long resumeUserId) {
        return expectedValueComparatorDto.getStringValues().stream()
                .anyMatch(value -> {
                    final List<Experience> matches = experienceRepository.findByResumeUserIdAndJobTitleOrDescriptionLikeIgnoreCase(
                            resumeUserId,
                            value
                    );
                    return matches.stream().anyMatch(e -> {
                        LocalDate start = e.getStartDate();
                        LocalDate end = e.getEndDate() != null ? e.getEndDate() : LocalDate.now();
                        long years = ChronoUnit.YEARS.between(start, end);
                        return  compareYears(years, expectedValueComparatorDto.getNumericValue(), requirement.getOperator());
                    });
                });
    }

    public boolean compareYears(long actualYears, long requiredYears, OperatorsEnum operator) {
        return switch (operator) {
            case EQUALS -> actualYears == requiredYears;
            case NOT_EQUALS -> actualYears != requiredYears;
            case GREATER_THAN -> actualYears > requiredYears;
            case GREATER_THAN_OR_EQUAL -> actualYears >= requiredYears;
            case LESS_THAN -> actualYears < requiredYears;
            case LESS_THAN_OR_EQUAL -> actualYears <= requiredYears;
            default -> false;
        };
    }

}
