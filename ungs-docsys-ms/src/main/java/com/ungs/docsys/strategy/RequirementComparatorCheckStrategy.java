package com.ungs.docsys.strategy;

import com.ungs.docsys.enums.RequirementType;
import com.ungs.docsys.models.Requirement;

public interface RequirementComparatorCheckStrategy {
    RequirementType getType();

    boolean isApplied(Requirement requirement, Long resumeUserId);
}
