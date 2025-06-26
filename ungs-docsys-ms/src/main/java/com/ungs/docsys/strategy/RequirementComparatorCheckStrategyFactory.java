package com.ungs.docsys.strategy;

import com.ungs.docsys.enums.RequirementTargetComparator;
import com.ungs.docsys.strategy.comparators.RequirementComparatorCheckCertification;
import com.ungs.docsys.strategy.comparators.RequirementComparatorCheckEducation;
import com.ungs.docsys.strategy.comparators.RequirementComparatorCheckExperience;
import com.ungs.docsys.strategy.comparators.RequirementComparatorCheckLanguage;
import com.ungs.docsys.strategy.comparators.RequirementComparatorCheckTechnicalSkill;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Component
public class RequirementComparatorCheckStrategyFactory {

    private final Map<RequirementTargetComparator, RequirementComparatorCheckStrategy> strategies = new HashMap<>();

    @Autowired
    public RequirementComparatorCheckStrategyFactory(RequirementComparatorCheckExperience experience,
                                                     RequirementComparatorCheckEducation education,
                                                     RequirementComparatorCheckCertification certification,
                                                     RequirementComparatorCheckTechnicalSkill skill,
                                                     RequirementComparatorCheckLanguage language) {
        strategies.put(RequirementTargetComparator.EXPERIENCE_DATA, experience);
        strategies.put(RequirementTargetComparator.EDUCATION_DATA, education);
        strategies.put(RequirementTargetComparator.CERTIFICATION_DATA, certification);
        strategies.put(RequirementTargetComparator.TECHNICAL_SKILL_DATA, skill);
        strategies.put(RequirementTargetComparator.LANGUAGE_DATA, language);
    }

    public RequirementComparatorCheckStrategy getStrategy(RequirementTargetComparator type) {
        return Optional.ofNullable(strategies.get(type))
                .orElseThrow(() -> new RuntimeException("No strategy for type: " + type));
    }
}
