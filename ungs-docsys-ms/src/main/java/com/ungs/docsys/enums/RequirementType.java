package com.ungs.docsys.enums;

public enum RequirementType {
    EXPERIENCE_DATA,
    EDUCATION_DATA,
    TECHNICAL_SKILL_DATA,
    CERTIFICATION_DATA,
    LANGUAGE_DATA;

    public static RequirementType fromString(String name) {
        try {
            return RequirementType.valueOf(name);
        } catch (IllegalArgumentException ex) {
            throw new IllegalArgumentException("Requirement type not supported: " + name);
        }
    }
}
