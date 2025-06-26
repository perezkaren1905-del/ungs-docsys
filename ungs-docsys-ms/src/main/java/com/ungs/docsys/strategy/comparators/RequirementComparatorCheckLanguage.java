package com.ungs.docsys.strategy.comparators;

import com.ungs.docsys.enums.RequirementTargetComparator;
import com.ungs.docsys.models.Requirement;
import com.ungs.docsys.strategy.RequirementComparatorCheckStrategy;
import org.springframework.stereotype.Component;

@Component
public class RequirementComparatorCheckLanguage implements RequirementComparatorCheckStrategy {

    public RequirementTargetComparator getType() {
        return RequirementTargetComparator.LANGUAGE_DATA;
    }

    @Override
    public boolean isApplied(Requirement requirement, Long resumeUserId) {
        // Implement the logic to check if the requirement is applied for the given resume user ID
        // This is a placeholder implementation and should be replaced with actual logic
        return true;
    }
}
