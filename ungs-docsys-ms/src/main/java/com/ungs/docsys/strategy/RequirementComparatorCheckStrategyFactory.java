package com.ungs.docsys.strategy;

import com.ungs.docsys.enums.RequirementTargetComparator;
import com.ungs.docsys.strategy.comparators.*;
import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.EnumMap;
import java.util.Map;
import java.util.Optional;

@Component
@AllArgsConstructor
public class RequirementComparatorCheckStrategyFactory {

    private final RequirementComparatorCheckTechnicalSkill technicalSkillStrategy;
    private final RequirementComparatorCheckCertification certificationStrategy;
    private final RequirementComparatorCheckLanguage languageStrategy;
    private final RequirementComparatorCheckEducation educationStrategy;
    private final RequirementComparatorCheckExperience experienceStrategy;

    private final Map<RequirementTargetComparator, RequirementComparatorCheckStrategy> strategies = new EnumMap<>(RequirementTargetComparator.class);

    @PostConstruct
    public void init() {
        strategies.put(RequirementTargetComparator.CERTIFICATION_DATA, certificationStrategy);
        strategies.put(RequirementTargetComparator.TECHNICAL_SKILL_DATA, technicalSkillStrategy);
        strategies.put(RequirementTargetComparator.LANGUAGE_DATA, languageStrategy);
        strategies.put(RequirementTargetComparator.EDUCATION_DATA, educationStrategy);
        strategies.put(RequirementTargetComparator.EXPERIENCE_DATA, experienceStrategy);
    }

    public RequirementComparatorCheckStrategy get(RequirementTargetComparator key) {
        return Optional.ofNullable(strategies.get(key))
                .orElseThrow(() -> new IllegalArgumentException("Strategy not found for: " + key));
    }

    public Map<RequirementTargetComparator, RequirementComparatorCheckStrategy> getMap() {
        return strategies;
    }
}
