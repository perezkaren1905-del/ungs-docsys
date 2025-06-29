package com.ungs.docsys.components;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ungs.docsys.dtos.ExpectedValueComparatorDto;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class ExpectedValueComparatorParserComponent {

    private final ObjectMapper objectMapper;

    public ExpectedValueComparatorDto parse(String jsonFromDb) {
        try {
            return objectMapper.readValue(jsonFromDb, ExpectedValueComparatorDto.class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error al parsear JSON", e);
        }
    }
}
