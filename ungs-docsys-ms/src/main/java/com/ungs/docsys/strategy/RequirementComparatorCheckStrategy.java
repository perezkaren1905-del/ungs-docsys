package com.ungs.docsys.strategy;

import com.ungs.docsys.models.Requirement;

public interface RequirementComparatorCheckStrategy {
    boolean isApplied(Requirement requirement, Long resumeUserId);
}
