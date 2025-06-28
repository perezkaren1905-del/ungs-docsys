package com.ungs.docsys.enums;


public enum RequirementType {
    GLOBAL,
    MANDATORY,
    PREFERRED;

    public static RequirementType fromString(String value) {
        if (value == null)
            throw new IllegalArgumentException("RequirementType cannot be null");

        try {
            return RequirementType.valueOf(value.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid RequirementType: " + value);
        }
    }
}
