package com.ungs.docsys.strategy.comparators;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ungs.docsys.enums.RequirementTargetComparator;
import com.ungs.docsys.models.Requirement;
import com.ungs.docsys.strategy.RequirementComparatorCheckStrategy;
import org.springframework.stereotype.Component;

@Component
public class RequirementComparatorCheckEducation implements RequirementComparatorCheckStrategy {

    public RequirementTargetComparator getType() {
        return RequirementTargetComparator.EDUCATION_DATA;
    }

    @Override
    public boolean isApplied(Requirement requirement, Long resumeUserId) {
        String expectedValue = requirement.getExpectedValue();

        if (expectedValue == null || expectedValue.isEmpty())
            return false;

        try {
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode node = objectMapper.readTree(expectedValue);


        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }
}
