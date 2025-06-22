package com.ungs.docsys.strategy.comparators;

import com.ungs.docsys.enums.RequirementType;
import com.ungs.docsys.models.Requirement;
import com.ungs.docsys.strategy.RequirementComparatorCheckStrategy;

public class RequirementComparatorCheckEducation implements RequirementComparatorCheckStrategy {

    @Override
    public RequirementType getType() {
        return null;
    }

    @Override
    public boolean isApplied(Requirement requirement, Long resumeUserId) {
        // Implement the logic to check if the education requirement is met
        // For example, you might check if the user's education level meets the requirement
        // This is a placeholder implementation
        return true; // Replace with actual logic
    }
}
