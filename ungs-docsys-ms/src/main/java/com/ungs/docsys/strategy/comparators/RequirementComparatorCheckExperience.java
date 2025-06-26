package com.ungs.docsys.strategy.comparators;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ungs.docsys.models.Requirement;
import com.ungs.docsys.repositories.ExperienceRepository;
import com.ungs.docsys.strategy.RequirementComparatorCheckStrategy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class RequirementComparatorCheckExperience implements RequirementComparatorCheckStrategy {

    @Autowired
    private ExperienceRepository experienceRepository;

    @Override
    public boolean isApplied(Requirement requirement, Long resumeUserId) {
        return false;
    }
}
