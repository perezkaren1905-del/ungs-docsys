package com.ungs.docsys.strategy.comparators;

import com.ungs.docsys.enums.RequirementType;
import com.ungs.docsys.models.Requirement;
import com.ungs.docsys.repositories.ExperienceRepository;
import com.ungs.docsys.strategy.RequirementComparatorCheckStrategy;
import org.springframework.beans.factory.annotation.Autowired;

public class RequirementComparatorCheckExperience implements RequirementComparatorCheckStrategy {

    @Autowired
    private ExperienceRepository experienceRepository;

    @Override
    public RequirementType getType() {
        return null;
    }

    @Override
    public boolean isApplied(Requirement requirement, Long resumeUserId) {


        //JSONObject expected = new JSONObject(requirement.getExpectedValue());
        //int minYears = expected.getInt("numeric_value");

        //return resumeUser.getYearsOfExperience() >= minYears;
        return true;
    }
}
